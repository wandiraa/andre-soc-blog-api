import mongoose from "mongoose";

const schema = mongoose.Schema;

const videoSchema = new schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const videoModel = mongoose.model("video", videoSchema);
export { videoModel };
