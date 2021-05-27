import { peopleModel } from "./people.model";
import httpStatus from "../../utils/httpStatus";

const peopleController = {};

// Get All People
peopleController.findAll = async (req, res) => {
    try {
        let people = await peopleModel.find();
        return res.json(people);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

// Get People By ID
peopleController.findOne = async (req, res) => {
    try {
        let people = await peopleModel.findById(req.params.peopleId);
        if (!people) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "People not found" });
        }
        return res.json(people);
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }
};

peopleController.store = async (req, res) => {
    try {
        const people = await peopleModel.create({
            title: req.body.title,
            author: req.body.author,
            views: req.body.views,
            url: req.protocol + "://" + req.headers.host + "/" + req.file.path
        });
        people.toObject();
        return res.status(httpStatus.CREATED).json({ data: { people } });
    } catch (error) {
        console.log(req.body.user);
        return res.status(500).json({ error: error.toString() });
    }
}

// Update People By ID
peopleController.update = async (req, res) => {
    try {
        let people = await peopleModel.findById(req.params.peopleId);
        if (!people) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "People not found" });
        }
        Object.assign(people, req.body);
        await people.save();
        return res.json(people);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

// Delete People By ID
peopleController.delete = async (req, res) => {
    try {
        let people = await peopleModel.findByIdAndRemove(req.params.peopleId);
        if (!people) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: "People not found" });
        }
        return res.json({ message: "People deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
};

export default peopleController;
