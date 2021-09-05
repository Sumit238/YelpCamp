const review = require("../models/review");
const campground = require("../models/campground");
const catchAsync = require("../utilis/catchAsync");

module.exports.addReview= catchAsync(async (req, res) => {
    const camp = await campground.findById(req.params.id);
    const newReview = new review(req.body);
    newReview.author=req.user._id
    camp.reviews.push(newReview);
    await camp.save();
    await newReview.save();
    req.flash("success", "Suceefully added new review");
    res.redirect(`/campground/show/${camp._id}`);
  })
module.exports.deleteReview=catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await review.findByIdAndDelete(reviewId);
  req.flash("success", "Suceefully deleted review");
  res.redirect(`/campground/show/${id}`);
})