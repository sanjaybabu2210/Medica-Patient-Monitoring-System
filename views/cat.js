
var mangoose = require("mangoose");

var catSchema = new mangoose.Schema({
	name: String,
	age: Number,
	temperament: String
});


var Cat = mangoose.model("Cat", catSchema);

var george = new Cat({
	name: "George",
	age: 11,
	temperament: "Grouchy"
});

george.save(function(err, cat){
	if(err){
		console.log("Something went wrong")
		
	}else {
		console.log("We just saved a cat to the db")
		console.log(cat)
	}
	
	
	
});