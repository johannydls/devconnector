const mongoose = require('mongoose');
const moment = require('moment-timezone');

const DEV_MONGO_URI = 'mongodb+srv://johanny-test:johanny123@clustermern-ykurb.mongodb.net/test?retryWrites=true&w=majority';
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGO_URI || DEV_MONGO_URI, MONGO_OPTIONS).then(() => {
  const logDate = moment(new Date(Date.now())).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
  console.log(`[${logDate}] Database successfully connected.`);
})
.catch(err => {
  const logDate = moment(new Date(Date.now())).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
  console.log(`[${logDate}] Database connection error.`);
  console.log(err);
});

module.exports = mongoose;