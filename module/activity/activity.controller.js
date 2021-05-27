import { activityModel } from "./activity.model";
import httpStatus from "../../utils/httpStatus";

const activityController = {};

// Get All Activity
activityController.findAll = async (req, res) => {
    try {
        let activity = await activityModel.find();
        return res.json(activity);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

// Get Activity By ID
activityController.findOne = async (req, res) => {
    try {
        let activity = await activityModel.findById(req.params.activityId);
        if (!activity) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Activity not found" });
        }
        return res.json(activity);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

activityController.store = async (req, res) => {
    try {
        const activity = await activityModel.create({
            user: req.body.user,
            status: req.body.status,
            description: req.body.description,
            date: req.body.date,
            icon: req.body.icon,
            imageUrl: req.body.imageUrl
        });
        activity.toObject();
        return res.status(httpStatus.CREATED).json({ data: { activity } });
    } catch (error) {
        console.log(req.body.user);
        return res.status(500).json({ error: error.toString() });
    }
}

// Update Activity By ID
activityController.update = async (req, res) => {
    try {
        let activity = await activityModel.findById(req.params.activityId);
        if (!activity) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Activity not found" });
        }
        Object.assign(activity, req.body);
        await activity.save();
        return res.json(activity);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

// Delete Activity By ID
activityController.delete = async (req, res) => {
    try {
        let activity = await activityModel.findByIdAndRemove(req.params.activityId);
        if (!activity) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "Activity not found" });
        }
        return res.json({ message: "Activity deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default activityController;
