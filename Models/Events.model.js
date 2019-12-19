const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "User" },

    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
    },
    category: {
        type: String,
        enum: ["Outdoors", "Food", "Music", "thisWeekend", "Charity", "Night"],
    },
    public: {
        type: Boolean,
    },


    attending: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requested: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

module.exports = mongoose.model("Event", eventSchema)