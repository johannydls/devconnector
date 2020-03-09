const app = require('./app');
const moment = require('moment-timezone');

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  const logDate = moment(new Date(Date.now())).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
  console.log(`[${logDate}] API listening on port ${PORT}`);
});