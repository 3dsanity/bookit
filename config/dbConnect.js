import mongoose from 'mongoose';

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(process.env.DB_LOCAL_URI, {
    // mongoose.connect(process.env.DB_MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopography: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
  });
};

export default dbConnect;
