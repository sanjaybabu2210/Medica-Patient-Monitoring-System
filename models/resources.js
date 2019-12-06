
var mongoose = require("mongoose");

//SCHEMA SETUP
var courseSchema = new mongoose.Schema({
	course: String,
	courseCode: String,
	cat1: String,
	cat2: String,
	fat: String,
	
	syllabus: String,
	syllabusId: String,
	download: String,

	

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