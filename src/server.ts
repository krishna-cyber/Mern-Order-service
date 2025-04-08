import { Config } from "./config/config";
import app from "./app";
import logger from "./config/logger";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "";

const clientOptions = {
  serverApi: { version: "1" as const, strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db!.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    startServer();
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

const startServer = () => {
  try {
    app.listen(Config.PORT, () => {
      logger.info(`Server is running on port ${Config.PORT}`, {
        port: Config.PORT,
      });
      logger.error(`This is an error log!`); // this log is consoled because it is an error log
      logger.debug(`Debugging is enabled!`); // this log is not consoled because we set priority level upto only info in logger transport
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.info(`Error: ${error}`);
    process.exit(1);
  }
};

run().catch(console.dir);
