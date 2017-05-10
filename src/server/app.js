import express from 'express';
import logger from 'winston';

const server = (afterServerStartCallback) => {
  const app = express();
  const PORT = process.env.PORT;
  console.log(process.env.NODE_ENV);
  app.listen(PORT, () => {
    if (afterServerStartCallback) {
      afterServerStartCallback();
    }
  });
};

if (process.env.NODE_ENV !== 'jobs') {
  server(() => {
    logger.info(`Yetta crawler ${process.env.NODE_ENV} server listening on port ${process.env.PORT}!`);
  });
}

export default server;
