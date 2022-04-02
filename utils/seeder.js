const Room = require('../models/room');
const mongoose = require('mongoose');

const rooms = require('../data/rooms');
const uri =
  'mongodb+srv://sanity_bookit:ZOjPf8zzUUy5ALbz@bookit.nheyk.mongodb.net/BookIT?retryWrites=true&w=majority';

mongoose.connect(uri, {
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
