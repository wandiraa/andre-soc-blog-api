import express from "express";
import videoController from "./video.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const videoRoutes = express.Router();

// GetAll Data
videoRoutes.get("/", asyncWrapper(videoController.findAll));

// GetBy ID
videoRoutes.get("/:videoId", asyncWrapper(videoController.findOne));

// Create by ID
videoRoutes.post("/", asyncWrapper(videoController.store));

// Update by ID
videoRoutes.put("/:videoId", asyncWrapper(videoController.update));

// Delete by ID
videoRoutes.delete("/:videoId", asyncWrapper(videoController.delete));

export { videoRoutes };
