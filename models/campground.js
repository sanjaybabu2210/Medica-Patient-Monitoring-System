
var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	adTitle: String,
	
	type: String,
	description: String,
	room: String,
	block: String,
	ph: String,
	img1: String,
	img1Id: String,
	img2: String,
	img2Id: String,
	img3: String,
	img4: String,
	img5: String,
	img6: String,
	createdAt: {type: Date, default: Date.now},
	price1: String,
	price2: String,
	

	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
	// category:{
	// 	id: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Category"
	// 	},
	category: String
		// },
    
	
});
module.exports = mongoose.model("Campground",campgroundSchema);