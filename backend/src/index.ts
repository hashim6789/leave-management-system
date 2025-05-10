import http from 'http';
import { ENV } from './configs';
import { app } from './settings/app';
import 'module-alias/register';

/**
 * Port number for the server to listen on.
 * Default is 3333, can be overridden with the PORT environment variable.
 */
const PORT = ENV.PORT;
const domain = ENV.DOMAIN;

// Create HTTP server
const server = http.createServer(app);

/**
 * Start the server and listen on the specified port.
 */

server.listen(PORT, () => console.log(`Server is running in http://${domain}:${PORT}`));
