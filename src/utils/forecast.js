const request = require('request')

const forecast = (latitud, longitud, callback) => {
    const url = 'https://api.darksky.net/forecast/720f2a6209e828cbd45a3b853bcaab3c/' + latitud + ',' + longitud

    request({ url, json: true}, (error, {body}) => {
        if(error) { 
            callback('Unable to connect to weather service!')
        } else if(body.error) {
            callback('Unabled to find location')
        } else {
            const temp = body.currently.temperature
            const rainChance = body.currently.precipProbability
            const daily = body.daily.data[0].summary
            const message = daily + ' It is currently ' + temp + ' degrees out. There is a ' + rainChance + '% chance of rain.'
        
            callback(undefined, message)
        }
    })
}

module.exports = forecast