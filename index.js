require('dotenv').config()
const express = require("express");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoSanitize = require('express-mongo-sanitize');
const expressSessions = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const MongoStore = require('connect-mongo')

const ExpressError = require("./utilis/ExpressError");
const catchAsync = require("./utilis/catchAsync");
const campgroundRoute = require("./routes/campground");
const reviewRoute = require("./routes/review");
const usersRoute = require("./routes/user");

const validationSchemas = require("./validationSchemas/schemas");
const campground = require("./models/campground");
const review = require("./models/review");
const user = require("./models/user");

const app = express();
const dbUrlLocal='mongodb://localhost/YelpCamp'
const mongoAtlasURL=process.env.dbURL
const sessionStore= MongoStore.create({
  mongoUrl:mongoAtlasURL,
  secret: "thisisasecret",
  touchAfter: 24 * 3600,
  autoRemove: 'interval',
  autoRemoveInterval: 10
})
sessionStore.on('error',(err)=>{
  console.log(err)
})
const sessConfig = {
  name:'nhqRFeeokwniekmlkwodwh',
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    // secure:true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view");

app.use("/static", express.static("public"));
app.use(expressSessions(sessConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize());


passport.use(new passportLocal.Strategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser=req.user
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.use("/campground", campgroundRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/reviews", reviewRoute);
app.use("/campground/:id/review", reviewRoute);
app.use("/user", usersRoute);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("PAGE NOT FOUND", 404));
});

app.use((err, req, res, next) => {
  const { message = "Something Went Wrong ", statusCode = 500 } = err;
  res.status(statusCode);
  req.flash("error", `${message} ${statusCode}`);
  res.redirect(req.session.prvPage);
});

const port =process.env.PORT || 80; 

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

const mongoose = require("mongoose");

mongoose
  .connect(mongoAtlasURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("err:", err);
  });
