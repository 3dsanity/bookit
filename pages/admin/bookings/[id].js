import React from 'react';
import { getSession } from 'next-auth/react';

import Layout from '../../../components/layout/Layout';
import { fetchMyBooking } from '../../../contexts/actions/bookingActions';
import { BOOKING_DETAILS_SUCCESS } from '../../../contexts/constants/bookingConstants';
import BookingDetails from '../../../components/booking/BookingDetails';

const AdminBookingsPage = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const { id } = params;
  const data = await fetchMyBooking(id, req);

  return {
    props: {
      ssrState: {
        payload: { bookingDetails: data },
        type: BOOKING_DETAILS_SUCCESS,
      },
    },
  };
};

export default AdminBookingsPage;
