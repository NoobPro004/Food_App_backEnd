const mongoose = require("mongoose");
// let { DB_LINK } = require("../secrets");

const validator = require("email-validator");
let {dbLink} = require('../secret');
mongoose
    .connect(dbLink,{
        useNewUrlParser:true,

        useUnifiedTopology:true,
    }).then(function (db) {
        console.log("db has been conncetd")
    }).catch(function (error) {
        console.log("err", error);
    })

    const bookingSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        plan: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        bookedAt: {
            type: Date
        },
        priceAtThatTime: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "failed", "sucess"],
            required: true,
            default: "pending"
        }
    })
    const bookingModel = mongoose.model("bookingModel", bookingSchema);
    module.exports = bookingModel;