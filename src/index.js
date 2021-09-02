const mongoose = require('mongoose');
const { app } = require('./app');
const { keys } = require('../web-config')

const start = async () => {
 
  if (!keys.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!keys.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();