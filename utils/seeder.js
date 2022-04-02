const Room = require('../models/room');
const mongoose = require('mongoose');

const rooms = require('../data/rooms');

mongoose.connect('mongodb://localhost:27017/bookit', {
  // useNewUrlParser: true,
  // useUnifiedTopography: true,
  // useFindAndModify: true,
  // useCreateIndex: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();

    await Room.insertMany(rooms);

    process.exit();
  } catch (e) {
    console.log({ e });
    process.exit();
  }
};

seedRooms();
