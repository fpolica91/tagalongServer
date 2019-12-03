const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
        type: String,

    },
    category: {
        type: String,
        enum: ["Outdoors", "Food/Wine", "Music", "This Weekend", "Charity", "Night"],

    },
    public: {
        type: Boolean,
    },
    attending: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requested: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

module.exports = mongoose.model("Event", eventSchema)