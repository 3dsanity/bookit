import absoluteUrl from 'next-absolute-url';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import Room from '../models/room';

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

export { stripeCheckoutSession };
