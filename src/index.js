const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { autoIncrement } = require('./models/plugins');

console.log('Something')

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log('Nice')
  logger.info('Connected to MongoDB');

  autoIncrement.initialize(mongoose.connection);
  logger.info('Initalised autoIncreament');

  server = app.listen(3000, () => {
    console.log('Running')
    logger.info(`Listening to port ${config.port}`);
  });
}).catch(err => {
  console.log('Error');
  console.log(err);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
