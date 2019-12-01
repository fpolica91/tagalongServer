const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Outdoors", "Food/Wine", "Music", "This Weekend", "Charity", "Night"],
        required: true
    },
    public: {
        type: Boolean,
        required: true
    },
    attending: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requested: [{ type: Schema.Types.ObjectId, ref: "User" }]
})

module.exports = mongoose.model(eventSchema, "Event")