const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/YelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log("err:", err)
    })
const campground = require('../models/campground');
const city = require('./seedLocations');
const Names = require('./seedHelpers')

async function dbAdd() {
    await campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        let randLoc = Math.floor(Math.random() * 1000)
        let rand1name = Math.floor(Math.random() * 18)
        let rand2name = Math.floor(Math.random() * 21)
        let Price = Math.floor(Math.random() * 20 + 10)
        let City = city[randLoc].city + ',' + city[randLoc].state;
        let Name = Names.descriptors[rand1name] + ' ' + Names.places[rand2name];
        let images = [{
            url:'https://th.bing.com/th/id/OIP.TS9EmdZeBIDJRHZW-G0e5AHaFj?w=238&h=180&c=7&r=0&o=5&pid=1.7',
            filename:'test'
        }]
        let description = 'Some quick example text to build on the card title and make up the bulk of the cards content.'
        const camp = new campground({ title: Name, location: City, images: images, price: Price, description: description ,author:'612cce8549a0c40b00fbd2a2' })
        await camp.save()
    }

}
dbAdd().then(() => {
    mongoose.connection.close()
})