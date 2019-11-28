var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Campground = require("../models/campground");
var Category = require("../models/category");
var Request = require("../models/request");
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
	var category1 = null;

	// eval(require("locus"));
	
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({adTitle: regex}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
              if(allAds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("adPost/index",{adpost:allAds, category1:category1, noMatch: noMatch});
			  
           }
        });
    } else {
        // Get all campgrounds from DB
        Campground.find({}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
              res.render("adPost/index",{adpost:allAds, category1:category1, noMatch: noMatch});
           }
        });
    }
});

router.get("/category/:category",function(req,res){
	       var noMatch = null;
		   var category1 = req.params.category;
	       console.log(category1);
	if(category1=="all")
		{
			category1=null;
		}
			Campground.find({category:category1}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
			   if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds, category1:category1, noMatch: noMatch});
           }
			});
		   
		   });


	
router.get("/category/:category1/blocks/:block",function(req,res){
	       var noMatch = null;
		   var category2 = req.params.category1;
		   var blocks = req.params.block;
		
	if(blocks=="all")
		{
			blocks = null;
		}
	
			Campground.find({category:category2,block:blocks}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
			     if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds,category1:category2, noMatch: noMatch});
           }
			});
		   
		   });
router.get("/category/blocks/:block",function(req,res){
	       var noMatch = null;
	       var category1 = null;
	var blocks = req.params.block;
	if(blocks=="all")
		{
			blocks = null;
		}
	console.log(blocks);
		   
			Campground.find({block:blocks}, function(err, allAds){
				console.log(allAds);
           if(err){
               console.log(err);
           } else {
			     if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds,category1:category1,noMatch: noMatch});
           }
			});
		   
		   });
//CREATE-ROUTE
router.get("/category",middleware.isLoggedIn, function(req,res){
	res.render("category")
})
router.get("/category/new",function(req,res){

	res.render("adPost/new");
	
});



router.get("/request/new",function(req,res){
			res.render("request/new");

});
router.get("/request",function(req,res){
	       var noMatch = null;

		   
			Request.find({}, function(err, allreq){
				
           if(err){
               console.log(err);
			   
           } else {
			     if(allreq.length < 1) {
                  noMatch = "SORRY NO ADS Request FOR YOUR SEARCH ):";
              }
			   console.log(allreq);
			   
              res.render("request/show",{allreq:allreq,noMatch: noMatch});
           }
			});
		   
		   });
router.post("/request", middleware.isLoggedIn,function(req,res){
			var reqTitle = req.body.requestTitle;
	        var description = req.body.description;
			var priceRange = req.body.priceRange;
			var Phone = req.body.phone;
			var block = req.body.block;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
			var category = req.body.category;
	var reqNew = {
		reqTitle:reqTitle, description:description, priceRange: priceRange, author: author,Phone:Phone,block:block, category:category
	}
	console.log(reqNew);
	Request.create(reqNew, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			return res.redirect('back');
		}else{
			
			res.redirect("/adPost/request");
		}
	});

});

router.post("/category/new",function(req,res){
	var category = req.body.category;
	console.log(category);

	var categoryn = {category1:category}
	console.log(categoryn)
	// Category.create(categoryn, function(err,newlycat){
	// 	if(err){
	// 		req.flash('error', err.message);
	// 		return res.redirect('back');
	// 	}else{
			
	// 		res.render("campgrounds/new",{category:newlycat});
	
	// 	}
	// });

	res.render("adPost/new",{category:category});
	
	
	
});
router.get("/category2",middleware.isLoggedIn, function(req,res){
	res.render("category2")
})
router.get("/category/new2", middleware.isLoggedIn, function(req,res){

	res.render("request/new");
	
});
router.post("/category/new2",function(req,res){
	var category = req.body.category;
	console.log(category);

	var categoryn = {category1:category}
	console.log(categoryn)


	res.render("request/new",{category:category});
	
	
	
});

router.post("/", middleware.isLoggedIn, upload.single('img1'),function(req, res ,next) {
///
	
	cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  
  // add author to campground
 
//  app.post('/', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])


	var adTitle = req.body.adTitle;
	var img1 = result.secure_url;
	var img1_id = result.public_id;
	
		
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var category = req.body.category;
	var ph = req.body.ph;
		
	var room = req.body.room;
	var block = req.body.block;
	var price1 = req.body.price1;
	var price2 = req.body.price2;

console.log(ph);
	
	 var newAd = {adTitle:adTitle,category: category, ph:ph, img1: img1 ,imgId: img1_id,description: description, author: author,room:room,block:block, price1:price1 }
	console.log(category);
console.log(ph);
		console.log(newAd);
	//create a new campground and save to db
	Campground.create(newAd, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			return res.redirect('back');
		}else{
			
			res.redirect("/adPost");
		}
	});
	});

});
//NEW-ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("adPost/new");
});
//show route
router.get("/:id",function(req,res){
	//find the campground with provided id and show
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundAd){
		if(err){
			console.log(err);
		}
		else{
			res.render("adPost/show", {adpost: foundAd});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
			Campground.findById(req.params.id, function(err, foundAd){
				res.render("adPost/edit", {adpost: foundAd} );		});
});
router.post("/:id", middleware.checkCampgroundOwnership,upload.single('img1'), function(req,res){
	//find and update the correct campground and redirect show page
	Campground.findById(req.params.id,async function(err, adpost){
		if(err){
			req.flash("error", err.message)
			res.redirect("back");
		}else{
			
	if (req.file){
		try {
			await cloudinary.v2.uploader.destroy(adpost.img1Id) ;
			
			var result = await cloudinary.v2.uploader.upload(req.file.path);
				adpost.img1Id = result.public_id;
				adpost.img1 = result.secure_url;
			
		}catch(err){
			req.flash("error", err.message);
			req.redirect("back");
		}
		
			
			
		
	}
			Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
				if(err){
					req.flash("error", err.message);
					req.redirect("back");
					
				}else{
					req.flash("success", "Successfully Updated")
			res.redirect("/adPost/" + req.params.id);
				}
})
			
		}
		
	});
});
//UPDATE CAMPGROUND ROUTE
// Campground Like Route
router.post("/:id/like", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, foundAd) {
        if (err) {
            console.log(err);
            return res.redirect("/adPost");
        }

        // check if req.user._id exists in foundCampground.likes
        var foundUserLike = foundAd.likes.some(function (like) {
            return like.equals(req.user._id);
        });

        if (foundUserLike) {
            // user already liked, removing like
            foundAd.likes.pull(req.user._id);
        } else {
            // adding the new user like
            foundAd.likes.push(req.user);
        }

        foundAd.save(function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/adPost");
            }
            return res.redirect("/adPost/" + foundAd._id);
        });
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/adPost");
		}else{
			res.redirect("/adPost");
		}
	});
});
router.post("/req/:id",middleware.checkCampgroundOwnership, function(req,res){
	Request.findByIdAndRemove(req.params.id, function(err){
		
		if(err){
			res.redirect("/adPost/request");
		}else{
			res.redirect("/adPost/request");
		}
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//middleware

module.exports = router