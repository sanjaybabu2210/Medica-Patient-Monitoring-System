var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Share = require("../models/share");
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
			   console.log(noMatch);
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
	
	console.log("i go it");

	var name = req.body.name;
	


	var date = req.body.date.slice(0,11);
	var time = req.body.date.slice(11,18);
	var fromPlace = req.body.fromPlace;
	var toPlace = req.body.toPlace;
	var description = req.body.description;
	var preference1 = req.body.preference1;
	var preference2 = req.body.preference2;
	var phone = req.body.phone;

	var author = {
		id: req.user._id,
		username: req.user.username
	}
	 var newShare = {toPlace: toPlace,author:author,description:description, preference1:preference1, preference2:preference2, fromPlace: fromPlace, time:time, date:date, name:name,phone:phone }

	console.log(newShare);
	//create a new campground and save to db
	Share.create(newShare, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			
			return res.redirect('back');
		}else{
			console.log(newlyCreated);
			res.redirect("/share" );
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


router.delete("/share/:id", function(req,res){
	Share.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/share");
		}else{
			res.redirect("/share");
		}
	});
});
















module.exports = router