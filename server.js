// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`server running ${port}`);
};

// set Get for returning projectData
app.get('/all', function (req,res){
    // send prject data
    res.send(projectData);    
});

// set Post 
app.post('/add', function (req, res){
    postData = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_experence: req.body.user_experence
    }    
    Object.assign(projectData, postData);
    res.send(projectData);
})