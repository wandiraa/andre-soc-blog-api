import mongoose from "mongoose";

const schema = mongoose.Schema;

const documentSchema = new schema({
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

const documentModel = mongoose.model("document", documentSchema);
export { documentModel };
