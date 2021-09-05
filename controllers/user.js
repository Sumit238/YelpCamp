const passport = require("passport");
const catchAsync = require(".././utilis/catchAsync");
const ExpressError = require(".././utilis/ExpressError");
const user = require(".././models/user");
module.exports.renderRegisterPage= (req, res) => {
  res.render("user/register");
}
module.exports.createNewUser= catchAsync( async (req, res) => {
  try {
    const { email, username } = req.body;
    const newUser = await user.register(
      new user({ email: email, username: username }),
      req.body.password
    );
    req.login(newUser,err=>{
      if(err) return next(err)
      req.flash("success", "Welcome to YelpCamp");
      return res.redirect("/campgrounds")
    })
  } catch (e) {
    req.flash("error", e.message);
    res.redirect('/user/register');
  }
})

module.exports.renderloginPage=(req, res) => {
  res.render("user/login");
}