var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Campground = require("../models/patient");
var Category = require("../models/category");


var Request = require("../models/request");
var Report = require("../models/reports");

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
  api_secret:  #api_secret_for_your_account
});


router.get("/",middleware.isLoggedIn, function(req, res){
    var noMatch = null;
	var category1 = null;

	// eval(require("locus"));
	
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
              if(allAds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("adPost/index",{adpost:allAds, noMatch: noMatch});
			  
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
router.get("/newrecord",function(req,res){
	res.render("newreport");
	
}); 

router.post("/report1/rep" ,upload.single('img1') ,function(req, res ,next) {
///
	cloudinary.uploader.upload(req.file.path, function(result) {
	
	


	var doctor = req.body.doctor;
		var patient = req.body.patient;
	
console.log(req.body.doctor);
	
		
	var problem = req.body.problem;
		var progress = req.body.progress;
		var symtoms = req.body.symtoms;
	var img1 = result.secure_url;
	var img1id = result.public_id;
	var phone = req.body.phone;
		var treatment = req.body.treatment;
	

console.log(phone);
	
	 var patient = {doctor:doctor,patient: patient,img1:img1,img1id:img1id,phone:phone,problem: problem, symtoms: symtoms,progress:progress,treatment:treatment }
	

	//create a new campground and save to db
					Report.create(patient, function(err,newlyCreated){
						if(err){
							req.flash('error', err.message);
							return res.redirect('back');
						}else{

							res.redirect("/adPost");
						}
					});
		
		
	
	});
});



router.get("/category/:category1",function(req,res){
	       var noMatch = null;
		   var c1 = req.params.category1;
	       console.log(c1);
	if(c1=="all")
		{
			
				
	Campground.find( {} , function(err, allAds){
           if(err){
               console.log(err);
           } else {
			   
			   if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
			      console.log(allAds);
              res.render("adPost/index",{adpost:allAds, category1:c1, noMatch: noMatch});
           }
			});
		}
	else{  Campground.find( {category:c1},function(err, allAds){
			
           if(err){
               console.log(err);
           } else {
			   if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
			 
			   
              res.render("adPost/index",{adpost:allAds, category1:c1, noMatch: noMatch});
           }
				
				
				
		   
		   });
			 }
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

	
router.get("/category/:category1/blocks/:block",function(req,res){
	       var noMatch = null;
		   var category2 = req.params.category1;
		   var blocks = req.params.block;
		
	console.log(category2);
	if(category2 =="all" && blocks == "all"){
			Campground.find({}, function(err, allAds){
	if(err){
	console.log(err);
	} else {
			     if(allAds.length < 1) {
	noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
	}
	res.render("adPost/index",{adpost:allAds,category1:category2, noMatch: noMatch});
	}
			});
		}
	else if(blocks=="all")
		{
			Campground.find({category:category2}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
			     if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds,category1:category2, noMatch: noMatch});
           }
			});
		}
	else if(category2 =="all"){
			Campground.find({block:blocks}, function(err, allAds){
           if(err){
               console.log(err);
           } else {
			     if(allAds.length < 1) {
                  noMatch = "SORRY NO ADS FOUND FOR YOUR SEARCH ):";
              }
              res.render("adPost/index",{adpost:allAds,category1:category2, noMatch: noMatch});
           }
			});
		}
		
	else{
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
	}
		   });

//CREATE-ROUTE




router.post("/", middleware.isLoggedIn, upload.single('img1') ,function(req, res ,next) {
///
	
	cloudinary.uploader.upload(req.file.path, function(result) {


	var name = req.body.name;
	var img1 = result.secure_url;
	var img1_id = result.public_id;

	
		
	var address = req.body.address;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	
	var phone = req.body.phone;
		
		
	var age = req.body.age;


console.log(phone);
	
	 var patient = {name:name,Age: age,phone:phone,img1: img1 ,img1Id: img1_id,address: address, author: author }
	

	//create a new campground and save to db
					Campground.create(patient, function(err,newlyCreated){
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
















router.get("/:id",function(req,res,next){
	
	Campground.findById(req.params.id).populate("comments").exec(function(err, data){
		if(err){
			console.log(err);
		}
		else{
			Report.find({patient: data.name},function(err,reports){
				if(err){
					console.log(err);
				}else{
					
					res.render("adPost/show", {patient:data ,report:reports});
				}
			})
		}
	});
});
router.get("/report/:id",function(req,res,next){
	
	Report.findById(req.params.id).populate("comments").exec(function(err, data){
		
			Report.find({patient: data.name},function(err,reports){
				if(err){
					console.log(err);
				}else{
					
					res.render("adPost/reports", {data:data});
				}
			})
		
	});
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};









module.exports = router
