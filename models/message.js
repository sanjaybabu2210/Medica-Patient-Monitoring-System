 var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var MessageSchema = new mongoose.Schema({
	text1: String,
	text2: String,
	text3: String,
	text4: String



	

});


module.exports = mongoose.model("Message", MessageSchema);