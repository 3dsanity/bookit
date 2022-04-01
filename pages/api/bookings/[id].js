import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import {
  deleteBooking,
  getBookingDetails,
} from '../../../controllers/bookingControllers';
import { authorizeRoles, isAuthenticatedUser } from '../../../middlewares/auth';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getBookingDetails);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteBooking);

export default handler;
