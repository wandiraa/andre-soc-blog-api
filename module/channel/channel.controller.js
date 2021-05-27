import { channelModel } from "./channel.model";
import httpStatus from "../../utils/httpStatus";

const channelController = {};

// Get All Channel
channelController.findAll = async (req, res) => {
    try {
        let channel = await channelModel.find();
        return res.json(channel);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

// Get Channel By ID
channelController.findOne = async (req, res) => {
    try {
        let channel = await channelModel.findById(req.params.channelId);
        if (!channel) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Channel not found" });
        }
        return res.json(channel);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

channelController.store = async (req, res) => {
    try {
        const channel = await channelModel.create({
            name: req.body.name,
            imageUrl: req.body.imageUrl
        });
        channel.toObject();
        return res.status(httpStatus.CREATED).json({ data: { channel } });
    } catch (error) {
        console.log(req.body.user);
        return res.status(500).json({ error: error.toString() });
    }
}

// Update Channel By ID
channelController.update = async (req, res) => {
    try {
        let channel = await channelModel.findById(req.params.channelId);
        if (!channel) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Channel not found" });
        }
        Object.assign(channel, req.body);
        await channel.save();
        return res.json(channel);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

// Delete Channel By ID
channelController.delete = async (req, res) => {
    try {
        let channel = await channelModel.findByIdAndRemove(req.params.channelId);
        if (!channel) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Channel not found" });
        }
        return res.json({ message: "Channel deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default channelController;
