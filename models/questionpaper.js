
var mongoose = require("mongoose");

//SCHEMA SETUP
var qpSchema = new mongoose.Schema({
	courseTitle: String,
	type: String,
	createdAt: {type: Date, default: Date.now},
	image : String,
	imageId: String,
	download: String,
	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},
	
	
});
module.exports = mongoose.model("questionpaper",qpSchema);