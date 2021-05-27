import mongoose from "mongoose";

const schema = mongoose.Schema;

const channelSchema = new schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

const channelModel = mongoose.model("channel", channelSchema);
export { channelModel };
