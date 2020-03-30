
var mongoose = require("mongoose");

//SCHEMA SETUP
var reportSchema = new mongoose.Schema({
	
	
	img1: String,
	img1Id: String,
	doctor: String,
	patient: String,
	problem: String,
	symtoms:String,
	progress:String,
	treatment:String,
	
	
	createdAt: {type: Date, default: Date.now},


	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},
   
	

	
});
module.exports = mongoose.model("Report", reportSchema);