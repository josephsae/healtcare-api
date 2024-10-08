import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/db";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use("/api", routes);
    app.use(errorHandler);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
