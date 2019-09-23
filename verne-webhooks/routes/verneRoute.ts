import { logger } from "@dojot/dojot-module-logger";
import express from "express";
import util from "util";
import ProjectUtils from "../utils/utils";

const TAG = { filename: "verneRoute" };

/**
 * VerneMQ webhooks routes creation function.
 * @param app Express application to be used
 */
const verneRoute = (app: express.Application) => {
  /**
   * Endpoint for webhook on_publish
   */
  app.post("/pub", (req: express.Request, res: express.Response) => {
    logger.debug("Received request in /pub", TAG);
    logger.debug(`Request body:\n${util.inspect(req.body)}`, TAG);

    const payload = utils.setPayload(req.body.payload, req.body.username);
    logger.debug(`Created payload:\n${util.inspect(payload)}`, TAG);

    res.status(200).send({});
  });





  });
};

export default verneRoute;
