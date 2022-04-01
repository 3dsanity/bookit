import { useEffect } from 'react';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../layout/Loader';
import { useAppContext } from '../../contexts/state';
import { getAdminRooms, deleteRoom } from '../../contexts/actions/roomActions';
import { DELETE_ROOM_RESET } from '../../contexts/constants/roomConstants';

const AllRooms = () => {
  const {
    dispatch,
    state: {
      allRooms: { rooms, error, loading },
      room: { error: deleteError, isDeleted },
    },
  } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    getAdminRooms(dispatch);

    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (isDeleted) {
      router.push('/admin/rooms');
      dispatch({ type: DELETE_ROOM_RESET });
    }
  }, [dispatch, deleteError, error, isDeleted]);

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: 'Room ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price / Night',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteRoomHandler(room._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };

  const deleteRoomHandler = (id) => {
    deleteRoom(id, dispatch);
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">
            {`${rooms && rooms.length} Rooms`}

            <Link href="/admin/rooms/new">
              <a className="mt-0 btn text-white float-right new-room-btn">
                Create Room
              </a>
            </Link>
          </h1>

          <MDBDataTable
            data={setRooms()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllRooms;
