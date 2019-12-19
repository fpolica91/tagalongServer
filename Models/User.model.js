const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    // PUT AFTER PROFILE CREATION
    preferences: {
        type: [String],
        enum: ["Outdoors", "Food/Wine", "Music", "Charity", "Night"],
    },
    vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    tagRequested: [{ type: Schema.Types.ObjectId, ref: "Event" }]

},{
    timestamps: true
})




module.exports = mongoose.model('User', userSchema)