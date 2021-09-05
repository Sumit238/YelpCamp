const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require(".././utilis/catchAsync");
const ExpressError = require(".././utilis/ExpressError");
const validationSchemas = require(".././validationSchemas/schemas");
const user = require(".././models/user");
const { isLoggedin,setVisitingPage } = require("../utilis/middlewares");
const userController=require("../controllers/user");

router.route('/register')
.get(setVisitingPage,userController.renderRegisterPage)
.post(userController.createNewUser);

router.get("/login",setVisitingPage, userController.renderloginPage);

router.post("/login",passport.authenticate("local",{failureFlash:true, failureRedirect: '/user/login'}),(req,res)=>{
  const redirectUrl ='/campground'
  req.flash("success","Logged In Successfully")
  res.redirect(redirectUrl)

})
router.get("/logout",isLoggedin, (req,res)=>{
   req.logout()
   req.flash("success","Good Bye")
   res.redirect('/')
})
module.exports = router;
