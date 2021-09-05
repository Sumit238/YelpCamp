const validationSchemas = require('.././validationSchemas/schemas');
const campground = require('.././models/campground');
const ExpressError = require('.././utilis/ExpressError');
const review = require('../models/review');
module.exports.isLoggedin= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.prevPath= req.originalUrl
        req.flash("error","You must login to continue")
        return res.redirect("/user/login")
    }
    next()
}
module.exports.setVisitingPage=(req,res,next)=>{
  req.session.prvPage=req.originalUrl
  next()
}
module.exports.isCampgroundAuthor =  async(req,res,next) =>{
    const camp = await campground.findById(req.params.id)
    if(!camp.author.equals(req.user._id)){
        req.flash('error','access denied')
        return res.redirect('/')
    }
    next()
}
module.exports.isReviewAuthor =  async(req,res,next) =>{
    const reviewer = await review.findById(req.params.reviewId)
    if(!reviewer.author.equals(req.user._id)){
        req.flash('error','access denied')
        return res.redirect('/')
    }
    next()
}

module.exports.validateCampground=function (req, res, next) {
    const camgroundSchema = validationSchemas.camgroundSchema
    const { error } = camgroundSchema.validate(req.body)
    if (error) {
        throw new ExpressError(error.details[0].message, 400)
    }
    else {
        next()
    }
}


module.exports.validateReview = function (req, res, next) {
  const reviewSchema = validationSchemas.reviewSchema;
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 504);
  } else {
    next();
  }
};