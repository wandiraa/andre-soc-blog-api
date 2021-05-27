import express from "express";
import apiRoutes from "./api";

const mainRouter = express.Router();

mainRouter.use("/api", apiRoutes);

export default mainRouter;
