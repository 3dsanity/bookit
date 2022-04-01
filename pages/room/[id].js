import { fetchRoom } from '../../contexts/actions/roomActions';
import Layout from '../../components/layout/Layout';
import RoomDetails from '../../components/room/RoomDetails';
import { useAppContext } from '../../contexts/state';
import { ROOM_DETAILS_SUCCESS } from '../../contexts/constants/roomConstants';

export default function Room() {
  const {
    state: {
      roomDetails: { room },
    },
  } = useAppContext();

  return (
    <>
      <Layout>{room && <RoomDetails room={room} />}</Layout>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const { id } = params;
  const room = await fetchRoom(req, id);
  return {
    props: {
      ssrState: { payload: { roomDetails: room }, type: ROOM_DETAILS_SUCCESS },
    },
  };
};
