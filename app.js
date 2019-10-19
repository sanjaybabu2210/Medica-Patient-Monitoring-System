var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
	Comment = require("./models/comment"),
	Campground = require("./models/campground"),
	seedDB = require("./seed"),
	passport = require("passport"),
	flash = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	User = require("./models/user")
//requring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campground"),
	authRoutes = require("./routes/index")
	require('dotenv').config()


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine","ejs")
app.use(express.static(__dirname +"/public"))
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); // seed the database

// const request = require('request');

// request('https://vitacademics-rel.herokuapp.com/api/v2/vellore/faculty', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });
//const curl = new (require( 'https://vitacademics-rel.herokuapp.com/api/v2/system' ))();




// Campground.create({
// 		name: "Granite Hill", 				image:"https://pixabay.com/get/57e9d2474c53a814f6da8c7dda793f7f1636dfe2564c704c732772d39f4ecc5d_340.jpg"},function(err,campgrounds
		
// 		){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("newly created campground");
// 		console.log(campgrounds);
// 	}
// });

app.locals.moment = require('moment');
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//to use current user in every single file
app.use(function(req,res, next){
		res.locals.currentUser = req.user;
		res.locals.error = req.flash("error");
		res.locals.success = req.flash("success");
		next();
		});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(8990, function(){
	console.log("app starter successfully")
})