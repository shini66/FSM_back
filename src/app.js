import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

import routerUser from "./routers/user.routes.js";
app.use("/api/users", routerUser);

import errorMiddleware from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

export default app;
