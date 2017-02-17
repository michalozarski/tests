// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    make: String,
    model: Number,
    color: String,
    reg: String,
    seat: String,
	status: Number,
	currentLocation: {
    type: [Number],
    index: '2d' },
	futureLocation: {
    type: [Number],
    index: '2d' },
    premium: {type: Boolean, default:false},
    password: String,
	sex: String
}));