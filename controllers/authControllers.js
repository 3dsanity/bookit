import User from '../models/user';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/errorHandler';
import absoluteUrl from 'next-absolute-url';
import crypto from 'crypto';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import sendEmail from '../utils/sendEmail';

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

// forgot password  = /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // get origin
  const { origin } = absoluteUrl(req);

  // const create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset token url is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'BookIT Password Recovery',
      text: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(e.message, 500));
  }
});

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPassword: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler('Password reset token is invalid or has expired', 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  // setup the new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

export {
  registerUser,
  currentUserProfile,
  updateCurrentProfile,
  forgotPassword,
  resetPassword,
};
