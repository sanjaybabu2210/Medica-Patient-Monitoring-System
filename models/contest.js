 var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	message: String



	

});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Contest", UserSchema);