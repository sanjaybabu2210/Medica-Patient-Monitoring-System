
var mongoose = require("mongoose");

//SCHEMA SETUP
var reqSchema = new mongoose.Schema({
	reqTitle: String,
	category: String,

	description: String,

	block: String,
	createdAt: {type: Date, default: Date.now},
	priceRange: String,
	
	Phone: String,

	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},

	
});
module.exports = mongoose.model("requests",reqSchema);