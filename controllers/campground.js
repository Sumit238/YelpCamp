const campground = require('.././models/campground');
const mongoose = require("mongoose");
const review = require('.././models/review');
const ExpressError = require('.././utilis/ExpressError');
const catchAsync = require('.././utilis/catchAsync');
const mbxGeocoding =require('@mapbox/mapbox-sdk/services/geocoding')
const mbxToken=process.env.map_box_token
const geoCoder=mbxGeocoding({accessToken:mbxToken});

module.exports.index= catchAsync(async (req, res, next) => {
    const campgrounds = await campground.find({})
    res.render('campground/index', { campgrounds })
})

module.exports.showCampground=catchAsync(async (req, res) => {
    const camp = await campground.findById(req.params.id)
    .populate(
        { path :'reviews',
          populate :{
              path:'author'
          }
            
    }).populate('author')
    res.render('show/show', { camp })
})

module.exports.deleteImage=catchAsync(async (req, res) => {
  const { id, imageId } = req.params;
  await campground.findByIdAndUpdate(id,{ $pull:{images:{_id:imageId}}},{useFindAndModify:false})
  req.flash("success", "Suceefully deleted Image");
  res.redirect(`/campground/show/${id}`);
})

module.exports.createCampground= catchAsync(async (req, res, next) => {
    const geoData=await geoCoder.forwardGeocode({
        query: req.body.location,
        limit: 1
        }).send()
    const newCamp = new campground(req.body)
    newCamp.geometry=geoData.body.features[0].geometry
    newCamp.author=req.user._id
    await newCamp.save()
    req.flash('success', 'Suceefully added new campground')
    res.redirect('/campgrounds')
})
module.exports.uploadImage= catchAsync(async (req, res, next) => {
    const Camp = await campground.findById(req.params.id)
    Camp.images.push(...req.body.images)
    await Camp.save()
    req.flash('success', 'Suceefully added new image')
    res.redirect(`/campground/show/${req.params.id}`)
})

module.exports.editCampground=catchAsync(async (req, res) => {
    const geoData=await geoCoder.forwardGeocode({
        query: req.body.location,
        limit: 1
        }).send()
    req.body.geometry=geoData.body.features[0].geometry
    await campground.findByIdAndUpdate(req.params.id, req.body)
    req.flash('success', 'Suceefully edited campground')
    res.redirect(`/campground/show/${req.params.id}`)
})

module.exports.deleteCampground=catchAsync(async (req, res) => {

    await campground.findByIdAndDelete(req.params.id)
    req.flash('success', 'Suceefully deleted campground')
    res.redirect('/campgrounds')
})
module.exports.insertImagesReqBody= (req,res,next)=>{
    req.body.images=[]
    req.files.forEach(element => {
        req.body.images.push({
            url:element.path,
            filename:element.filename
        })
    });
    next()
    
}