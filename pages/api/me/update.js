import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { updateCurrentProfile } from '../../../controllers/authControllers';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateCurrentProfile);

export default handler;
