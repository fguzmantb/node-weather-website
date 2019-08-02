const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for Express conf§ig
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Freddy Guzman',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Freddy Guzman',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Freddy Guzman',
        message: 'How can I help you?',
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide a address'
        });
    }

    geocode(address, (error, {latitud, longitud, location} = {}) => {
        if(error) {
            return res.send({
                error: error,
            });
        }

        forecast(latitud, longitud, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error,
                });
            }

            res.send({
                location,
                forecast: forecastData,
                address,
            });
        });
    });


});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        message: 'Help article not found',
        name: 'Freddy Guzman',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        message: '404',
        name: 'Freddy Guzman',
    });
});

app.listen(3000, () => {
    console.log('Server is up in port 3000.')
})