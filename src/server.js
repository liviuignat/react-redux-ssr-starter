// @flow

import * as http from 'http';
import * as logger from 'er-common-components/lib/helpers/logger';
import {app} from 'expressApp';

const port: number = parseInt(process.env.PORT, 10) || 9300;
const server = http.createServer(app);

async function startServer() {
  return new Promise((resolve, reject) => {
    server.listen(port, undefined, undefined, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

startServer()
  .then(() => logger.log(`💻  Open http://localhost:${port} in a browser to view the app.`))
  .catch(err => logger.error(`Failed to start server. Error: ${JSON.stringify(err)}`));
