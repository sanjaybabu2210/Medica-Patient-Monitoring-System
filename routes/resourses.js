var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Share = require("../models/share");
var Feed = require("../models/feedb");
var middleware = require("../middleware/index.js");



router.get("/share", function(req, res){
    var noMatch = null;
	// eval(require("locus"));
	
    if(req.query.search2 != 0) {
        const regex1 = new RegExp(req.query.search2, 'gi');
	
        // Get all campgrounds from DB
        Share.find({date: regex1}, function(err, allshares){
           if(err){
               console.log(err);
           } else {
              if(allshares.length < 1) {
                  noMatch = "No journey Shceduled on that day";
              }
              res.render("share/index",{ share: allshares, noMatch: noMatch });
           }
        });
    } else {
        // Get all campgrounds from DB
        Share.find({}, function(err, allshares){
           if(err){
               console.log(err);
           } else {
              res.render("share/index",{ share:allshares, noMatch: noMatch});
           }
        });
    }
});
router.post("/share", middleware.isLoggedIn,function(req, res ,next) {
///
	
	

	var name = req.body.name;
	


	var date = req.body.date;
	var time = req.body.time;
	var fromPlace = req.body.fromPlace;
	var toPlace = req.body.toPlace;
	var phone = req.body.phone;

	var author = {
		id: req.user._id,
		username: req.user.username
	}
	 var newShare = {toPlace: toPlace,author:author, fromPlace: fromPlace, time: time, date:date, name:name,phone:phone }
	
	//create a new campground and save to db
	Share.create(newShare, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			console.log(newlyCreated);
			return res.redirect('back');
		}else{
			
			res.redirect("/share" );
		}
	});

});
router.get("/feedback",function(req,res){
	res.send("hig")
})
router.post("/feedback", function(req, res ,next) {
///
	
	

	var fname = req.body.fname;
	var lname = req.body.lname;
	


	var comment = req.body.comment;
	
	var email = req.body.email;


	 var newfeed = {fname: fname,lname:lname, comment: comment, email:email}
	
	//create a new campground and save to db
	Feed.create(newfeed, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			console.log(newlyCreated);
			return res.redirect('back');
		}else{
			
			res.redirect("/" );
		}
	});

});
//NEW-ROUTE
router.get("/share/new", middleware.isLoggedIn, function(req,res){
	res.render("share/new");
});



// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };


router.delete("/:id",middleware.checkShareOwnership, function(req,res){
	Share.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/share");
		}else{
			res.redirect("/share");
		}
	});
});
















module.exports = router