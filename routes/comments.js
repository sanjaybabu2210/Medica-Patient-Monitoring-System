var express = require("express");
var router = express.Router({mergeParams: true });
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware");


//===========
//COMMENTS ROUTES

//=========
//comments new
router.get("/new", middleware.isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,campground){
			if(err){
				console.log(err);
			} else {
				res.render("comments/new", {campground: campground});
			}
	})
});
//comments create
router.post("/", middleware.isLoggedIn, function(req,res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					req.flash("error", "Something went Wrong");
					console.log(err);
				}else{
					// add username and id to comment
					 comment.author.id = req.user._id;
					comment.author.username= req.user.username;
					comment.save();
					//save to comment
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added comment");
					res.redirect('/campgrounds/' + campground._id);
					
				}
			})
			
			
			
		}
	})
	
});

router.get("/:comment_id/edit", function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	res.render("comments/edit",{campground_id: req.params.id});
});
//middleware
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

module.exports = router
