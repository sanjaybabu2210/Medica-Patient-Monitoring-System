var express = require("express");
var router = express.Router();
var router = express.Router({mergeParams: true });
var Course = require("../models/resources.js");
var middleware = require("../middleware/index.js");



router.get("/view/resources", function(req, res){
    var noMatch = null;
	// eval(require("locus"));
	res.send("hi am there")
    // if(req.query.search3 != 0) {
    //     const regex1 = new RegExp(req.query.search3, 'gi');
	
    //     // Get all campgrounds from DB
    //     Course.find({course: regex1}, function(err, allcourse){
    //        if(err){
    //            console.log(err);
    //        } else {
    //           if(allcourse.length < 1) {
    //               noMatch = "No journey Shceduled on that day";
    //           }
    //           res.render("resources/index",{ course: allcourse, noMatch: noMatch });
    //        }
    //     });
    // } else {
    //     // Get all campgrounds from DB
    //     Course.find({}, function(err, allcourse){
    //        if(err){
    //            console.log(err);
    //        } else {
    //           res.render("resources/index",{ course:allcourse, noMatch: noMatch});
    //        }
    //     });
    // }
});
router.post("/view/resources", middleware.isLoggedIn,function(req, res ,next) {
///
	
	

	var course = req.body.course;
	


	var courseCode = req.body.courseCode;

	 var newCourse = {course: course,courseCode:courseCode }
	
	//create a new campground and save to db
	Course.create(newCourse, function(err,newlyCreated){
		if(err){
			req.flash('error', err.message);
			console.log(newlyCreated);
			return res.redirect('back');
		}else{
			
			res.redirect("/resources" );
		}
	});

});
//NEW-ROUTE
router.get("/view/resources/new", middleware.isLoggedIn, function(req,res){
	res.render("resources/new");
});



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