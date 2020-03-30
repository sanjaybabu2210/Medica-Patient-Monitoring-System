var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),

	Campground = require("./models/patient"),
	seedDB = require("./seed"),
	passport = require("passport"),
	flash = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	FacebookStrategy = require("passport-facebook"),
	methodOverride = require("method-override"),
	User = require("./models/user"),
	configAuth = require("./auth");


	const admin = require('firebase-admin');

	let serviceAccount = require('./security/serviceAccountKey.json');
	
	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount)
	});
	
	let db = admin.firestore();

	db.collection('messages').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
		console.log("hi am there");
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });


const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '6fa0ad6d',
  apiSecret: '3zDAgs45YVreY1ql'
});


































////
mongoose.connect('mongodb+srv://sanjaybabu:vhRXwndZr3c5jNzH@cluster1-fu4qm.mongodb.net/Medical?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
var adpostRoutes = require("./routes/adPost"),
	authRoutes = require("./routes/index")
	require('dotenv').config()


mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine","ejs")
app.use(express.static(__dirname +"/public"))
app.use(methodOverride("_method"));
app.use(flash());

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

app.use("/adPost", adpostRoutes);



app.listen(process.env.PORT || 8000)