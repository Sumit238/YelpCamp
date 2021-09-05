
const lng=Number( document.querySelector('.lng').innerText)
const lat=Number( document.querySelector('.lat').innerText)
console.log(lng,lat)

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXQyMzgiLCJhIjoiY2t0M3ozdjNpMHoybDJ1bnpqbW54aWFtZiJ9.tdrXw5wzYqUnZRyGuZTO7w';
const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lng,lat], // starting position [lng, lat]
            zoom: 6 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([lng,lat])
    .addTo(map)