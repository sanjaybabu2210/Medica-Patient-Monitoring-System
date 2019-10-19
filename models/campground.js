
var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	adTitle: String,
	category: String,
	type: String,
	description: String,
	room: String,
	block: String,
	img1: String,
	img2: String,
	img3: String,
	img4: String,
	img5: String,
	img6: String,
	createdAt: {type: Date, default: Date.now},
	price1: String,
	price2: String,
	Phone: String,
	comments: [
	{
	  type: mongoose.Schema.Types.ObjectId,
	  ref: "Comment"
}],
	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		}
	
});
module.exports = mongoose.model("Campground",campgroundSchema);