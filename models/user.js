 var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: {type: String, unique : true, required: true},
	name:{type: String,  required: true},
	
	password: String,

	  
	verified: {type:Boolean, default:true},
	hospital: String,
	aadhar: String,
	count: Number,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	Doctor: {type: Boolean, default: false}
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);