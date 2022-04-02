import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import {
  createRoomReview,
  deleteReview,
  getRoomReviews,
} from '../../../controllers/roomControllers';
import { authorizeRoles, isAuthenticatedUser } from '../../../middlewares/auth';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getRoomReviews);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteReview);

export default handler;
