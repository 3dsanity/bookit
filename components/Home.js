import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagination from 'react-js-pagination';

import { useAppContext } from '../contexts/state';
import { RoomItem } from './room/RoomItem';

const Home = () => {
  const router = useRouter();
  const context = useAppContext();

  // console.log({ context });

  const {
    state: {
      allRooms: { rooms = [], resPerPage, roomsCount, filteredRoomsCount },
    },
  } = context;

  let { page = 1, location } = router.query;

  let queryParams;

  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search);
  }

  const handlePagination = (pageNumber) => {
    if (queryParams.has('page')) {
      queryParams.set('page', pageNumber);
    } else {
      queryParams.append('page', pageNumber);
    }
    router.replace({
      search: queryParams.toString(),
    });
  };

  const count = location ? filteredRoomsCount : roomsCount;

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${location}` : `All Rooms`}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No Rooms</b>
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>
      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={Number(page)}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
