import mongoose from "mongoose";

const schema = mongoose.Schema;

const activitySchema = new schema({
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

const activityModel = mongoose.model("activity", activitySchema);
export { activityModel };
