import absoluteUrl from 'next-absolute-url';
import getRawBody from 'raw-body';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import Room from '../models/room';
import User from '../models/user';
import Booking from '../models/booking';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// generate stripe checkout session -- /api/checkout_session/:roomId
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // get origin for url
  const { origin } = absoluteUrl(req);

  // get room details
  const room = await Room.findById(req.query.roomId);

  // create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [room.images[0].url],
        amount: req.query.amount * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

// create new booking after payment -- /api/webhook
const webhookCheckout = catchAsyncErrors(async (req, res) => {
  const rawBody = await getRawBody(req);

  try {
    // get signature from header
    const signature = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const room = session.client_reference_id;

      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });
    }

    res.status(200).json({ success: true });
  } catch (e) {
    console.log('Error in stripe checkout payment => ', { e });
  }
});

export { stripeCheckoutSession, webhookCheckout };
