import express from "express";
import activityController from "./activity.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const activityRoutes = express.Router();

// GetAll Data
activityRoutes.get("/", asyncWrapper(activityController.findAll));

// GetBy ID
activityRoutes.get("/:activityId", asyncWrapper(activityController.findOne));

// Create by ID
activityRoutes.post("/", asyncWrapper(activityController.store));

// Update by ID
activityRoutes.put("/:activityId", asyncWrapper(activityController.update));

// Delete by ID
activityRoutes.delete("/:activityId", asyncWrapper(activityController.delete));

export { activityRoutes };
