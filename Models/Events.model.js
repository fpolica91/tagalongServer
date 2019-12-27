const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    location: String,
    url: String,
    vehicles: [{
        car: { type: Schema.Types.ObjectId, ref: "Vehicle" },
        seats: Number
    }],
    attending: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        guest: Number
    }],
    requested: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        guest: Number
    }],
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Event", eventSchema)

// OLD EVENT SCHEMA
// const eventSchema = new Schema({
//     host: { type: Schema.Types.ObjectId, ref: "User" },
//     name: {
//         type: String,

//     },
//     category: {
//         type: String,
//         enum: ["Outdoors", "Food", "Music", "thisWeekend", "Charity", "Night"],

//     },
//     public: {
//         type: Boolean,
//     },
//     vehicles: [{type: Schema.Types.ObjectId, ref: "Vehicle"}],

//     attending: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     requested: [{ type: Schema.Types.ObjectId, ref: "User" }],
// },
// {
//     timestamps: true
// })