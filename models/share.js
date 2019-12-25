var mongoose = require('mongoose');




var shareSchema = new mongoose.Schema({
	
	
	name: String,
	phone: String,
	date: String,
	time: String,
    description: String,
	fromPlace: String,
	toPlace: String,
	preference1: String,
	preference2: String,
	createdAt: {type: Date, default: Date.now},
	
	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},
	

	
})

module.exports = mongoose.model("share",shareSchema);