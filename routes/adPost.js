var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Campground = require("../models/campground");
var Category = require("../models/category");
var Course = require("../models/resources");
var Question = require("../models/questionpaper");
var Request = require("../models/request");

var middleware = require("../middleware/index.js");
var size = require('window-size');


var multer = require('multer');

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
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
              // res.render("adPost/index",{adpost:allAds, category1:category1, noMatch: noMatch});
			   res.redirect("/adPost/category/all");
           }
        });
    }
});
router.get("/about",function(req,res){
	res.render("adPost/about");
})
router.get("/contact",function(req,res){
	res.render("adPost/contact");
})
router.get("/faq",function(req,res){
	res.render("adPost/faq");
})

router.get("/category/:category",function(req,res){
	       var noMatch = null;
		   var category1 = req.params.category;
	       console.log(category1);
	if(category1=="all")
		{
			
				Campground.find({}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
			   if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds, category1:category1, noMatch: noMatch});
           }
			});
		}else{  Campground.find({category:category1}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
			   if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds, category1:category1, noMatch: noMatch});
           }
				
				
				
		   
		   });
			 }
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
router.get("/category//blocks/:block",function(req,res){
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
router.delete("/request/:id", function(req,res){
	Request.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash('error', err.message);
			res.redirect("/adPost/request");
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

router.get("/resources/subject/newly", middleware.isLoggedIn, function(req,res){
	res.render("resources/new");
});

router.get("/resources/:id",function(req,res,next){
	
	Course.findById(req.params.id).populate("comments").exec(function(err, foundcourse){
		if(err){
			console.log(err);
		}
		else{
			Question.find({courseTitle: foundcourse.course},function(err,qp){
				if(err){
					console.log(err);
				}else{
					console.log("qp is:")
					console.log(qp);
					res.render("resources/quesp", {courses: foundcourse,qp:qp});
				}
			})
		
			
	
			
			 
			
		}
	});
});

//
router.get("/resources/:id/question",function(req,res,next){
	
	res.send("HI HERE YOUR QUESTION PAPERS")
});
//
router.post("/resources/:id/question", middleware.isLoggedIn, upload.single('image') ,function(req, res ,next) {
	cloudinary.uploader.upload(req.file.path, function(result) {
		
		Course.findById(req.params.id).populate("comments").exec(function(err, foundcourse){
		if(err){
			console.log(err);
		}
		else{
			var courseTitle = foundcourse.course;
			
		var type = req.body.category;
		var image= result.public_id;
			
		var imageId= result.secure_url;
			
		var download = imageId.slice(0,46) + imageId.slice(46,80) + 'pdf';
			if(imageId.slice(80,83)=='pdf')
				{
					imageId =  imageId.slice(0,80) + 'jpg';
				}
			
		var author = {
		id: req.user._id,
		username: req.user.username
	}
			
	var qpNew = {
		courseTitle:courseTitle,type:type,image:image,imageId:imageId, author: author,download:download
	}

	Question.create(qpNew, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			return res.redirect('back');
		}else{
			
			res.redirect("/adPost/resources");
		}
	});
		}
			});
		
			
	
			
			 
			
		
		
		
		
	});
});

//
router.post("/resources/:id", middleware.isLoggedIn, upload.single('img1') ,function(req, res ,next) {
///
	
	cloudinary.uploader.upload(req.file.path, function(result) {
		console.log(req.file.path);

		Course.findById(req.params.id, function(err, foundcourse){
		if(err){
			console.log(err);
		}
		else{
			// var x;
			// var x1;
			// var cat;
			// cat = req.body.category;
			// var ls = ['img1','img2','img3','img4','img5','img6','img7','img8','img9','img9','img10','img11','img12','img13','img14','img15','img16','img17','img18','img19','img20','img21'];
			// var lsid = ['img1Id','img2Id','img3Id','img4Id','img5Id','img6Id','img7Id','img8Id','img9Id','img10Id','img11Id','img12Id','img13Id','img14Id','img15Id','img16Id','img17Id','img18Id','img19Id','img20Id','img21Id'];
			// if(cat == 'cat1'){
			// 	for(var i=0;i<8;i++){
			// 	if(ls[i] == null){
			// 		x = ls[i];
			// 		x1 = lsid[i];
			// 		break;
			// 	}
			// 	}
			// }else if(cat == 'cat2'){
			// 	for(var i=8;i<15;i++){
			// 	if(ls[i] == null){
			// 		x = ls[i];
			// 		x1 = lsid[i];
			// 		break;
			// 	}
			// 	}
			// }else{
			// 	for(var i=15;i<21;i++){
			// 	if(ls[i] == null){
			// 		x = ls[i];
			// 		x1 = lsid[i];
			// 		break;
			// 	}
			// }
				
				
			// }
			
	        foundcourse.x = result.public_id;
			cloudinary.image("higher", {flags: "attachments"});
			foundcourse.x1 = result.secure_url;
			console.log(foundcourse);
			
			foundcourse.save(function(err,savedcourse)
							{
				if(err){
					console.log(err);
				}else{
					console.log(savedcourse);
				}
				res.redirect("/adPost/resources")
			
			})
			
		}
		
	});
		
		
	
	
	});
});

///


router.post("/", middleware.isLoggedIn, upload.single('img1') ,function(req, res ,next) {
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
		var img2 = "https://res.cloudinary.com/tycoon/image/upload/v1577472450/Capture_ruirju.png"
		var img3 = "https://res.cloudinary.com/tycoon/image/upload/v1577472450/Capture_ruirju.png"
		
	var room = req.body.room;
	var block = req.body.block;
	var price1 = req.body.price1;
	var price2 = req.body.price2;

console.log(ph);
	
	 var newAd = {adTitle:adTitle,category: category,added1:0,added2:0, ph:ph, img2:img2, img3:img3,img1: img1 ,img1Id: img1_id,description: description, author: author,room:room,block:block, price1:price1 }
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



router.get("/resources", function(req, res){
    var noMatch = null;
	// eval(require("locus"));

    if(req.query.search3 != 0) {
        const regex1 = new RegExp(req.query.search3, 'gi');
	
        // Get all campgrounds from DB
        Course.find({course: regex1}, function(err, allcourse){
           if(err){
               console.log(err);
           } else {
              if(allcourse.length < 1) {
                  noMatch = "No journey Shceduled on that day";
              }
              res.render("resources/index",{ course: allcourse, noMatch: noMatch });
           }
        });
    } else {
        // Get all campgrounds from DB
        Course.find({}, function(err, allcourse){
           if(err){
               console.log(err);
           } else {
              res.render("resources/index",{ course:allcourse, noMatch: noMatch});
           }
        });
    }
});

	router.post("/resources", middleware.isLoggedIn, upload.single('image') ,function(req, res ,next) {
///
	
	cloudinary.uploader.upload(req.file.path, function(result) {

	

	var course = req.body.course;
	
   var syllabus = result.secure_url;
		var syllabusId = result.public_id;
		var download = syllabus.slice(0,46) + syllabus.slice(46,80) + 'pdf';

	var courseCode = req.body.courseCode;

	 var newCourse = {course: course,courseCode:courseCode,download:download,syllabus:syllabus,syllabusId:syllabusId }
	console.log(newCourse);
	//create a new campground and save to db
	Course.create(newCourse, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			console.log(newlyCreated);
	
		}else{
			
			res.redirect("/adPost/resources" );
		}
	});
	});

});
// router.get("/resources/:id",function(req,res){
// 	//find the campground with provided id and show
// 	Course.findById(req.params.id).populate("comments").exec(function(err, foundcourse){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			 res.render("resources/quesp", {courses: foundcourse});
			
// 		}

// });


















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
			await cloudinary.uploader.destroy(adpost.img1Id) ;
			
			var result = await cloudinary.uploader.upload(req.file.path);
				adpost.img1Id = result.public_id;
				adpost.img1 = result.secure_url;
			
		}catch(err){
			req.flash("error", err.message);
			req.redirect("back");
		}
		
			
			
		
	}
			Campground.findByIdAndUpdate(req.params.id, req.body.adpost, function(err, updatedCampground){
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

////
router.post("/:id/image2", middleware.checkCampgroundOwnership,upload.single('img1'), function(req,res){
	//find and update the correct campground and redirect show page
	cloudinary.uploader.upload(req.file.path, function(result) {

	
var imgid = result.public_id;

   var img = result.secure_url;
	Campground.findById(req.params.id,async function(err, adpost){
		if(err){
			req.flash("error", err.message)
			res.redirect("back");
		}else{
			if(adpost.added1=='0'){
				adpost.img2id = imgid;
			adpost.img2 = img;
				adpost.added1 = 1;
				
			}else{
				adpost.img3id = imgid;
				adpost.img3 = img;
				adpost.added2= 1;
			}
			

			Campground.findByIdAndUpdate(req.params.id, adpost, function(err, updatedCampground){
				if(err){
					req.flash("error", err.message);
					req.redirect("back");
					
				}else{
					req.flash("success", "Successfully Updated")
			res.redirect("/adPost/" + req.params.id);
				}
				});
			
		}
	});
	});
});
router.post("/:id/image3", middleware.checkCampgroundOwnership,upload.single('img1'), function(req,res){
	//find and update the correct campground and redirect show page
	cloudinary.uploader.upload(req.file.path, function(result) {

	
var img3id = result.public_id;

   var img3 = result.secure_url;
	Campground.findById(req.params.id,async function(err, adpost){
		if(err){
			req.flash("error", err.message)
			res.redirect("back");
		}else{
			adpost.img3id = img3id;
			adpost.img3 = img3;

			Campground.findByIdAndUpdate(req.params.id, adpost, function(err, updatedCampground){
				if(err){
					req.flash("error", err.message);
					req.redirect("back");
					
				}else{
					req.flash("success", "Successfully Updated")
			res.redirect("/adPost/" + req.params.id);
				}
				});
			
		}
	});
	});
});
////
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


//middleware


// router.get("/pack", function(req, res){
//     var noMatch = null;
// 	// eval(require("locus"));
// res.send("hi send me")
//     // if(req.query.search3 != 0) {
//     //     const regex1 = new RegExp(req.query.search3, 'gi');
	
//     //     // Get all campgrounds from DB
//     //     Course.find({course: regex1}, function(err, allcourse){
//     //        if(err){
//     //            console.log(err);
//     //        } else {
//     //           if(allcourse.length < 1) {
//     //               noMatch = "No journey Shceduled on that day";
//     //           }
//     //           res.render("resources/index",{ course: allcourse, noMatch: noMatch });
//     //        }
//     //     });
//     // } else {
//     //     // Get all campgrounds from DB
//     //     Course.find({}, function(err, allcourse){
//     //        if(err){
//     //            console.log(err);
//     //        } else {
//     //           res.render("resources/index",{ course:allcourse, noMatch: noMatch});
//     //        }
//     //     });
//     // }
// });

//NEW-ROUTE



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


// router.delete("/:id",middleware.checkShareOwnership, function(req,res){
// 	Share.findByIdAndRemove(req.params.id, function(err){
// 		if(err){
// 			res.redirect("/share");
// 		}else{
// 			res.redirect("/share");
// 		}
// 	});
// });




























module.exports = router