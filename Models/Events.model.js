const mongoose = require('mongoose')
const Schema = mongoose.Schema
const textSearch = require('mongoose-text-search')

const eventSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
        type: Date,
        // required: true
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

    venue: String,
    address: String,
    url: String,
    vehicles: [{
        car: { type: Schema.Types.ObjectId, ref: "Vehicle" },
        seats: Number
    }],
    attending:
        [
            {
                user: { type: Schema.Types.ObjectId, ref: "User" },
                guest: Number
            }
        ],
    requested: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        guest: Number
    }],
},
    {
        timestamps: true
    })



module.exports = mongoose.model("Event", eventSchema)

