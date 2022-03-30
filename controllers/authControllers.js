import User from '../models/user';
import cloudinary from 'cloudinary';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerUser = catchAsyncErrors(async (req, res) => {
  const img_upload = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: img_upload.public_id,
      url: img_upload.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Account Registered Successfully',
    user,
  });
});

// current user profile = /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// udpate user profile = /api/me/update
const updateCurrentProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) user.password = req.body.password;

    if (req.body.avatar !== '') {
      const image_id = user.avatar.public_id;

      // delete user previous image
      await cloudinary.v2.uploader.destroy(image_id);

      const img_upload = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale',
      });

      user.avatar = {
        public_id: img_upload.public_id,
        url: img_upload.secure_url,
      };
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

export { registerUser, currentUserProfile, updateCurrentProfile };
