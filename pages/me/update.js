import React from 'react';
import { getSession } from 'next-auth/react';
import Profile from '../../components/user/Profile';
import Layout from '../../components/layout/Layout';

const UpdateProfilePage = () => {
  return (
    <Layout title="Search Rooms">
      <Profile />
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: session,
  };
};

export default UpdateProfilePage;
