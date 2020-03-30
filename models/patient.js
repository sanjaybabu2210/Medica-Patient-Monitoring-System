
var mongoose = require("mongoose");

//SCHEMA SETUP
var patientSchema = new mongoose.Schema({
	
	
	img1: String,
	img1Id: String,
	name: String,
	Age: String,
	phone: Number,
	address:String,
	
	
	createdAt: {type: Date, default: Date.now},


	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},
   
	

	
});
module.exports = mongoose.model("Campgrounds", patientSchema);