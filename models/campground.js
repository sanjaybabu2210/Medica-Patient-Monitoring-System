
var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	adTitle: String,
	
	type: String,
	description: String,
	room: String,
	block: String,
	ph: String,
	added1: String,
	added2: String,
	img1: String,
	img1Id: String,
	img2: String,
	img2id: String,
	img3: String,
	img3id: String,
	category: String,
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
        }]
	
	// category:{
	// 	id: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Category"
	// 	},

		// },
    
	
});
module.exports = mongoose.model("Campground",campgroundSchema);