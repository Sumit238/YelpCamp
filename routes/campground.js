const express = require('express')
const router = express.Router();
const catchAsync = require('.././utilis/catchAsync');


const ExpressError = require('.././utilis/ExpressError');
const {validateCampground, isLoggedin,isCampgroundAuthor,setVisitingPage} = require('.././utilis/middlewares')
const campground = require('.././models/campground');
const review = require('.././models/review');
const campgroundControllers =require('.././controllers/campground')
const multer  = require('multer')
const {storage}=require('.././utilis/cloudinary')
const upload = multer({storage})





router.get('/',setVisitingPage, campgroundControllers.index)

router.get('/show/:id',setVisitingPage,campgroundControllers.showCampground)

router.get('/new',isLoggedin,setVisitingPage, catchAsync(async (req, res) => {
    res.render('campground/new')
}))

router.post('/addNew', isLoggedin, upload.array('image'),campgroundControllers.insertImagesReqBody, validateCampground,campgroundControllers.createCampground)

router.get('/:id/edit',isLoggedin, isCampgroundAuthor,setVisitingPage, catchAsync(async (req, res) => {
    const camp = await campground.findById(req.params.id)
    res.render('campground/edit', { camp })
}))

router.get('/:id/images/:imageId/delete',campgroundControllers.deleteImage)

router.post('/:id/uploadPhoto',isLoggedin,upload.array('image'),campgroundControllers.insertImagesReqBody,campgroundControllers.uploadImage)

router.put('/:id/edit',isLoggedin, upload.array('image'),campgroundControllers.insertImagesReqBody, validateCampground, isCampgroundAuthor,setVisitingPage, campgroundControllers.editCampground)

router.get('/:id/delete', isLoggedin, isCampgroundAuthor,campgroundControllers.deleteCampground)

module.exports = router;
