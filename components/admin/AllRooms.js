import { useEffect } from 'react';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';

import Loader from '../layout/Loader';
import { useAppContext } from '../../contexts/state';
import { getAdminRooms } from '../../contexts/actions/roomActions';

const AllRooms = () => {
  const {
    dispatch,
    state: {
      allRooms: { rooms, error, loading },
    },
  } = useAppContext();

  useEffect(() => {
    getAdminRooms(dispatch);

    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }
  }, [dispatch]);

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
