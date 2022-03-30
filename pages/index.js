import Home from '../components/Home';
import { useAppContext } from '../contexts/state';
// import { AppContext } from 'next/app';

import { fetchRooms, useGetRooms } from '../contexts/actions/roomActions';
import Layout from '../components/layout/Layout';
import { ALL_ROOMS_SUCCESS } from '../contexts/constants/roomConstants';

export default function Index() {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const rooms = await fetchRooms(
    req,
    query.page,
    query.location,
    query.guests,
    query.category
  );

  return {
    props: {
      ssrState: { payload: { allRooms: rooms }, type: ALL_ROOMS_SUCCESS },
    },
  };
};

