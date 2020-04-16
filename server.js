// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

// Initialize all route with a callback function
app.get('/weather', (req, res) => {
    res.send(projectData);
});
app.post('/addWeather', (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['userInput'] = req.body.userInput;
    res.send(projectData);
});
// Callback function to complete GET '/all'

// Post Route

