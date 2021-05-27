import { videoModel } from "./video.model";
import httpStatus from "../../utils/httpStatus";

const videoController = {};

// Get All Document
videoController.findAll = async (req, res) => {
    try {
        let video = await videoModel.find();
        return res.json(video);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

// Get Document By ID
videoController.findOne = async (req, res) => {
    try {
        let video = await videoModel.findById(req.params.videoId);
        if (!video) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Document not found" });
        }
        return res.json(video);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

videoController.store = async (req, res) => {
    try {
        const video = await videoModel.create({
            title: req.body.title,
            author: req.body.author,
            views: req.body.views,
            url: req.body.url
        });
        video.toObject();
        return res.status(httpStatus.CREATED).json({ data: { video } });
    } catch (error) {
        console.log(req.body.user);
        return res.status(500).json({ error: error.toString() });
    }
}

// Update Document By ID
videoController.update = async (req, res) => {
    try {
        let video = await videoModel.findById(req.params.videoId);
        if (!video) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Document not found" });
        }
        Object.assign(video, req.body);
        await video.save();
        return res.json(video);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

// Delete Document By ID
videoController.delete = async (req, res) => {
    try {
        let video = await videoModel.findByIdAndRemove(req.params.videoId);
        if (!video) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Document not found" });
        }
        return res.json({ message: "Document deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default videoController;
