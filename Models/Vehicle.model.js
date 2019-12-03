const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
    model: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    seats: {
        type: Number,
        required: true
    },
    // PEOPLE THAT REQUEST TO COME
    requested: [{ type: Schema.Types.ObjectId, ref: "User" }],
    //PEOPLE ACCEPTED BY OWNER
    tagAlongs: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],

    }
})


module.exports = mongoose.model("Vehicle", vehicleSchema)