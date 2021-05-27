import express from "express";
import channelController from "./channel.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const channelRoutes = express.Router();

// GetAll Data
channelRoutes.get("/", asyncWrapper(channelController.findAll));

// GetBy ID
channelRoutes.get("/:channelId", asyncWrapper(channelController.findOne));

// Create by ID
channelRoutes.post("/", asyncWrapper(channelController.store));

// Update by ID
channelRoutes.put("/:channelId", asyncWrapper(channelController.update));

// Delete by ID
channelRoutes.delete("/:channelId", asyncWrapper(channelController.delete));

export { channelRoutes };
