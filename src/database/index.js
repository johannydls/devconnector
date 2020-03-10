const mongoose = require('mongoose');
const moment = require('moment-timezone');
const config = require('config');
const MONGO_URI = config.get('MONGO_URI');

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(MONGO_URI, MONGO_OPTIONS).then(() => {
  const logDate = moment(new Date(Date.now())).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
  console.log(`[${logDate}] Database successfully connected.`);
})
.catch(err => {
  const logDate = moment(new Date(Date.now())).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
  console.log(`[${logDate}] Database connection error.`);
    console.error(`[${logDate}] MongoError: ${err.message}`);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;