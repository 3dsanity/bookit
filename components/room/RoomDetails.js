import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Carousel } from '../carousel/Carousel';
import RoomFeatures from './RoomFeatures';
import {
  checkBooking,
  getBookedDates,
} from '../../contexts/actions/bookingActions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import { useAppContext } from '../../contexts/state';
import { useEffect } from 'react/cjs/react.development';
import { toast } from 'react-toastify';
import { CHECK_BOOKING_RESET } from '../../contexts/constants/bookingConstants';
import NewReview from '../review/NewReview';

import getStripe from '../../utils/getStripe';
import ListReviews from '../review/ListReview';

const RoomDetails = ({ room }) => {
  const router = useRouter();

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const {
    dispatch,
    state: {
      checkBooking: { available, loading: bookingLoading },
      auth: { user },
      bookedDates: { dates },
    },
  } = useAppContext();

  const onDatePickerChange = (dates) => {
    const [selectedCheckInDate, selectedCheckOutDate] = dates;

    setCheckInDate(selectedCheckInDate);
    setCheckOutDate(selectedCheckOutDate);

    if (selectedCheckInDate && selectedCheckOutDate) {
      const days = Math.floor(
        (new Date(selectedCheckOutDate) - new Date(selectedCheckInDate)) /
          86400000 +
          1
      );

      setDaysOfStay(days);

      checkBooking(
        id,
        selectedCheckInDate.toISOString(),
        selectedCheckOutDate.toISOString(),
        dispatch
      );
    }
  };

  const { id } = router.query;
  const excludedDates = [];
  dates?.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  // const newBookingHandler = async () => {
  //   const bookingData = {
  //     room: router.query.id,
  //     checkInDate,
  //     checkOutDate,
  //     daysOfStay,
  //     amountPaid: 90,
  //     paymentInfo: {
  //       id: 'STRIPE_PAYMENT_ID',
  //       status: 'STRIPE_PAYMENT_STATUS',
  //     },
  //   };

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'POST',
  //       body: JSON.stringify(bookingData),
  //     };

  //     const response = await fetch('/api/bookings', config);
  //     const data = await response.json();
  //   } catch (e) {
  //   }
  // };

  useEffect(() => {
    getBookedDates(id, dispatch);

    return () => dispatch({ type: CHECK_BOOKING_RESET });
  }, [dispatch, id]);

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;

    try {
      const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&amount=${amount}&daysOfStay=${daysOfStay}`;

      const options = {
        'Content-Type': 'application/json',
      };

      const data = await fetch(link, options).then((r) => r.json());

      const stripe = await getStripe(process.env.STRIPE_API_KEY);

      // redirect
      stripe.redirectToCheckout({ sessionId: data.id });

      setPaymentLoading(false);
    } catch (e) {
      setPaymentLoading(false);
      console.log({ e });
      toast.error(e.message);
    }
  };

  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: `${(room.ratings / 5) * 100}%`,
              }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>

        <div
          style={{
            width: '100%',
            height: 440,
            position: 'relative',
            overflow: 'hidden',
          }}
          className="imageContainer"
        >
          <Carousel>
            {room.images &&
              room.images.map((image) => (
                <Image
                  key={image.public_id}
                  src={image.url}
                  layout="fill"
                  className="image"
                  alt=""
                />
              ))}
          </Carousel>
        </div>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>

            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night
              </p>

              <hr />

              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onDatePickerChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {available === true && (
                <div className="alert alert-success my-3 font-weight-bold">
                  Room is available. Book now.
                </div>
              )}

              {available === false && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room not available. Try different dates.
                </div>
              )}

              {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room.
                </div>
              )}

              {available && user && (
                <button
                  className="btn btn-block py-3 booking-btn"
                  onClick={() => bookRoom(room._id, room.pricePerNight)}
                  disabled={bookingLoading || paymentLoading ? true : false}
                >
                  Pay - ${daysOfStay * room.pricePerNight}
                </button>
              )}
            </div>
          </div>
        </div>

        <NewReview />

        {room.reviews && room.reviews.length > 0 ? (
          <ListReviews reviews={room.reviews} />
        ) : (
          <p>No Reviews on this room</p>
        )}
      </div>
    </>
  );
};

export default RoomDetails;
