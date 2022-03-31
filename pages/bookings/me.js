import React from 'react';
import { getSession } from 'next-auth/react';

import MyBookings from '../../components/booking/MyBookings';
import Layout from '../../components/layout/Layout';

import { fetchMyBookings } from '../../contexts/actions/bookingActions';
import { MY_BOOKINGS_SUCCESS } from '../../contexts/constants/bookingConstants';

const MyBookingsPage = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const data = await fetchMyBookings(req);

  return {
    props: {
      ssrState: { payload: { bookings: data }, type: MY_BOOKINGS_SUCCESS },
    },
  };
};

export default MyBookingsPage;
