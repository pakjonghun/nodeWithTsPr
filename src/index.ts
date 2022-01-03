require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";
import router from "./routers";
import cookieParser from "cookie-parser";

createConnection()
  .then((connection) => {
    const app = express();
    app.use(morgan("tiny"));
    app.use("/upload", express.static("public"));
    app.use(cookieParser());
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:4000",
        credentials: true,
      })
    );

    app.use(router);
    app.listen(process.env.PORT, () =>
      console.log(`server is running on ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
