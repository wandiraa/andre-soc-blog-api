import mongoose from "mongoose";

const schema = mongoose.Schema;

const peopleSchema = new schema({
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

const peopleModel = mongoose.model("people", peopleSchema);
export { peopleModel };
