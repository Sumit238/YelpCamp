const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilis/catchAsync");
const ExpressError = require("../utilis/ExpressError");
const {validateReview,isLoggedin,isReviewAuthor} = require('.././utilis/middlewares')
const review = require("../models/review");
const campground = require("../models/campground");
const reviewController=require("../controllers/review")



router.post("/",validateReview,isLoggedin,reviewController.addReview );

router.delete("/:reviewId", isLoggedin,isReviewAuthor, reviewController.deleteReview);

module.exports = router;
