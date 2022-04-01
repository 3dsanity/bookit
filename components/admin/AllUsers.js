import { useEffect } from 'react';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../layout/Loader';
import { useAppContext } from '../../contexts/state';
import { adminGetAllUsers } from '../../contexts/actions/userActions';
import { DELETE_ROOM_RESET } from '../../contexts/constants/roomConstants';

const AllRooms = () => {
  const {
    dispatch,
    state: {
      allUsers: { users, error, loading },
    },
  } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    adminGetAllUsers(dispatch);

    if (error) {
      toast.error(error);
      // dispatch(clearErrors());
    }

    // if (isDeleted) {
    //   router.push('/admin/users');
    //   dispatch({ type: DELETE_ROOM_RESET });
    // }
  }, [dispatch, error, router]);

  const setUsers = () => {
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
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
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

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteUserHandler(user._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };

  const deleteUserHandler = (id) => {
    // deleteUser(id, dispatch);
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">
            {`${users && users.length} Users`}

            <Link href="/admin/user/new">
              <a className="mt-0 btn text-white float-right new-room-btn">
                Create User
              </a>
            </Link>
          </h1>

          <MDBDataTable
            data={setUsers()}
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
