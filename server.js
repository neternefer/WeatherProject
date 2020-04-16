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


// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(projectData);
});
app.post('/add', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
});
// Callback function to complete GET '/all'

// Post Route


app.listen(5000, () => {
    console.log('Listening on port 5000...');
});

