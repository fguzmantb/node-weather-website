const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZmd1em1hbnRiIiwiYSI6ImNqeWpmbTU1ZDAyN24zb3BlNzgxNzljeWoifQ.32F7HHUJr6L_ZHR_9c_kNg&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service')
        } else if(!body.features.length) {
            callback('Unable to find location. Try another search')
        } else { 
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode