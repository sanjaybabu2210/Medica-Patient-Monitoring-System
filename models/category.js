var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var catSchema = new mongoose.Schema({
	category1 : String
});


module.exports = mongoose.model("Category", catSchema);