//Initialize data container
const projectData = {};
//Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
//GET route
app.get('/all', (req, res) => {
    res.send(projectData);
});
//POST route
app.post('/add', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
});
//Express server
app.listen(5000, () => {
    console.log('Listening on port 5000...');
});

