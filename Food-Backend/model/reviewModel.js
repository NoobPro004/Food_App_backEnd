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
    
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can't be empty"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Review must contain some rating"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Review must belong to a user"],
        ref: "userModel"
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: "planModel",
        required: [true, "Review must belong to a plan "]
    }
});
const ReviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = ReviewModel;