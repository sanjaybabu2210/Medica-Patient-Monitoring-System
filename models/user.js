 var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: {type: String, unique : true, required: true},
	email:{type: String, unique : true, required: true},
	
	password: String,
	facebook:{
		id: String,
		token: String,
		email: String,
		name: String
	},
	firstName: String,
	lastName: String,
	year: String,
	location: String,
	avatar: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	isAdmin: {type: Boolean, default: false}
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);