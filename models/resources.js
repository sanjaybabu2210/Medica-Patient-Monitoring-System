
var mongoose = require("mongoose");

//SCHEMA SETUP
var courseSchema = new mongoose.Schema({
	course: String,
	courseCode: String,
	cat1: String,
	cat2: String,
	fat: String,
	
	img1: String,
	img1Id: String,
	img2: String,
	img3: String,
	img4: String,
	img5: String,
	img6: String,
	img7: String,
	img8: String,
	img9: String,
	img10: String,
	img11: String,
	img12: String,
	img13: String,
	img14: String,
	img15: String,
	img16: String,
	img17: String,
	img18: String,
	img19: String,
	img20: String,
	img21: String,
	

	createdAt: {type: Date, default: Date.now},



	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
		username: String
		},

	
});
module.exports = mongoose.model("Course",courseSchema);