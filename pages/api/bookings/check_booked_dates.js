import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { checkBookedDatesForRoom } from '../../../controllers/bookingControllers';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesForRoom);

export default handler;
