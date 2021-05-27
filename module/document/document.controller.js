import { documentModel } from "./document.model";
import httpStatus from "../../utils/httpStatus";

const documentController = {};

// Get All Document
documentController.findAll = async (req, res) => {
    try {
        let document = await documentModel.find();
        return res.json(document);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

// Get Document By ID
documentController.findOne = async (req, res) => {
    try {
        let document = await documentModel.findById(req.params.documentId);
        if (!document) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Document not found" });
        }
        return res.json(document);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

documentController.store = async (req, res) => {
    try {
        const document = await documentModel.create({
            title: req.body.title,
            author: req.body.author,
            views: req.body.views,
            url: req.protocol + "://" + req.headers.host + "/" + req.file.path
        });
        document.toObject();
        return res.status(httpStatus.CREATED).json({ data: { document } });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
}

// Update Document By ID
documentController.update = async (req, res) => {
    try {
        let document = await documentModel.findById(req.params.documentId);
        if (!document) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Document not found" });
        }
        Object.assign(document, req.body);
        await document.save();
        return res.json(document);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

// Delete Document By ID
documentController.delete = async (req, res) => {
    try {
        let document = await documentModel.findByIdAndRemove(req.params.documentId);
        if (!document) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Document not found" });
        }
        return res.json({ message: "Document deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default documentController;
