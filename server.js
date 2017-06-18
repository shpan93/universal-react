require('babel-core/register');
require('babel-polyfill');
const debug = require('debug')('server');
const http = require('http');
const app = require('./server/main').default;
const fetch = require('node-fetch');

const port = process.env.PORT || 8080;
const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
server.listen(port, () => {
  debug(`Express server listening on port ${server.address().port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
