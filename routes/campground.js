var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
//install multer cloudinary for image upload

var multer = require('multer');

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'tycoon', 
  api_key: '167312485966359', 
  api_secret: 'uD9LwJ61EhmLk4Y95rrXQNflIt8',
});

//index route
// router.get("/",function(req,res){
// 	   //get all campgrounds from DB
// 	// eval(require("locus"));
// 	if(req.query.search){
// }else{
// 	    Campground.find({},function(err, allCampgrounds){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
// 			}
// 		});
		
// 		//res.render("campgrounds",{campgrounds:allcampgrounds});
// }	});
router.get("/", function(req, res){
    var noMatch = null;
	// eval(require("locus"));
	
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({adTitle: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
           }
        });
    } else {
        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
           }
        });
    }
});

//CREATE-ROUTE


router.post("/", middleware.isLoggedIn, upload.single('img1'), function(req, res) {
///
	
	cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  
  // add author to campground
 
 

	var adTitle = req.body.adTitle;
	var img1 = result.secure_url;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var room = req.body.room;
	var block = req.body.block;
	var price1 = req.body.price1;
	var price2 = req.body.price2;
	var phone = req.body.phone;

	
	 var newCampground = {adTitle:adTitle, img1: img1 ,description: description, author: author,room:room,block:block, price1:price1 ,phone:phone }
	
	//create a new campground and save to db
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			return res.redirect('back');
		}else{
			
			res.redirect("/campgrounds" );
		}
	});
	});
});
//NEW-ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});
//show route
router.get("/:id",function(req,res){
	//find the campground with provided id and show
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
})
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
			Campground.findById(req.params.id, function(err, foundCampground){
				res.render("campgrounds/edit", {campground: foundCampground} );		});
});
router.post("/:id", middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground and redirect show page
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,  function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
		
	} );
});
//UPDATE CAMPGROUND ROUTE
//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//middleware

module.exports = router