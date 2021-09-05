const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}

cloudinary.config({ 
  cloud_name: process.env.cloudinary_cloud_name , 
  api_key: process.env.cloudinary_api_key, 
  api_secret: process.env.cloudinary_api_secret 
});

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:'YelpCamp',
  allowedFormats:['jpeg','png','jpg'],
  }
  
})

module.exports= {
    storage,
    cloudinary
}