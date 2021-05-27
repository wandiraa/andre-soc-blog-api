import express from "express";
import peopleController from "./people.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({
    storage: storage
});

const peopleRoutes = express.Router();

// GetAll Data
peopleRoutes.get("/", asyncWrapper(peopleController.findAll));

// GetBy ID
peopleRoutes.get("/:peopleId", asyncWrapper(peopleController.findOne));

// Create by ID
peopleRoutes.post("/", upload.single('url'), asyncWrapper(peopleController.store));

// Update by ID
peopleRoutes.put("/:peopleId", asyncWrapper(peopleController.update));

// Delete by ID
peopleRoutes.delete("/:peopleId", asyncWrapper(peopleController.delete));

export { peopleRoutes };
