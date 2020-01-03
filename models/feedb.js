 var mongoose = require("mongoose");


var feedSchema = new mongoose.Schema({
	email: {type: String, unique : true, required: true},
	fname:{type: String,  required: true},
	lname:{type: String,  required: true},
	
	comment:String,




});


module.exports = mongoose.model("feed", feedSchema);