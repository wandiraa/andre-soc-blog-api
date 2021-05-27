import express from "express";
import documentController from "./document.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({
    storage: storage
});

const documentRoutes = express.Router();

// GetAll Data
documentRoutes.get("/", asyncWrapper(documentController.findAll));

// GetBy ID
documentRoutes.get("/:documentId", asyncWrapper(documentController.findOne));

// Create by ID
documentRoutes.post("/", upload.single('url'), asyncWrapper(documentController.store));

// Update by ID
documentRoutes.put("/:documentId", asyncWrapper(documentController.update));

// Delete by ID
documentRoutes.delete("/:documentId", asyncWrapper(documentController.delete));

export { documentRoutes };
