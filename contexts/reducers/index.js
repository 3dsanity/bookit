import { allRoomsReducer, roomsDetailsReducer } from './roomReducers';
import { authReducer, forgotPasswordReducer } from './userReducers';

function combineReducers(slices) {
  return (state, action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );
}

const reducers = {
  allRooms: allRoomsReducer,
  roomDetails: roomsDetailsReducer,
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
};

export default combineReducers(reducers);
