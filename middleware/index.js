var Campground = require("../models/campground");
var Share = require("../models/share");


// all the middleware goes here
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated() && req.user.verified){
			Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back");
			} else{
				if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
					console.log(req.user.isAdmin);
				  next();
				}else{
					res.redirect("back");
				}
				
			}

		});
	} else{
		res.redirect("back");
	}


}
middlewareObj.checkShareOwnership = function(req, res, next){
	if(req.isAuthenticated() && req.user.verified){
			Share.findById(req.params.id, function(err, foundShare){
			if(err){
				res.redirect("back");
			} else{
				if(foundShare.author.id.equals(req.user._id) || req.user.isAdmin){
					console.log(req.user.isAdmin);
				  next();
				}else{
					res.redirect("back");
				}
				
			}

		});
	} else{
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated() && req.user.verified){
		return next();
	}
	req.flash("error","You need to be logged in to do that Or Check Your Account is Verified");
	res.redirect("/login");
}

module.exports = middlewareObj;