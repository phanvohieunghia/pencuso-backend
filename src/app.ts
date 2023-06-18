import express from "express";
import config from "config";
import logger from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
  logger.info(`App is running port http:\\localhost:${port}`);
  await connect();
  routes(app);
});
