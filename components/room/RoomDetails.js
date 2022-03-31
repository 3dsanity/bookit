import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Carousel } from '../carousel/Carousel';
import RoomFeatures from './RoomFeatures';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetails = ({ room }) => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();

  const onDatePickerChange = (dates) => {
    const [selectedCheckInDate, selectedCheckOutDate] = dates;

    setCheckInDate(selectedCheckInDate);
    setCheckOutDate(selectedCheckOutDate);
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
                selectsRange
                inline
              />

              <button className="btn btn-block py-3 booking-btn">Pay</button>
            </div>
          </div>
        </div>

        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>

          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
