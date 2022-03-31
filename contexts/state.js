import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import reducers from './reducers';

const AppContext = createContext();

const initialState = {
  roomDetails: {},
  allRooms: [],
  auth: {},
  forgotPassword: {},
  checkBooking: {},
  bookedDates: {},
  bookings: {},
  bookingDetails: {},
};

export const AppWrapper = ({ children, ssrState }) => {
  const didMount = useRef(false);
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    ...ssrState?.payload,
  });

  useEffect(() => {
    if (ssrState && didMount.current) {
      const { type, payload } = ssrState;

      const keys = Object.keys(payload).map((el) => el);

      dispatch({
        type,
        payload: payload[keys[0]],
      });
    } else {
      didMount.current = true;
    }
  }, [ssrState, didMount]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
