/* Global Variables */
// Create a new date instance dynamically with JS

// get date value
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
const aipKey  = 'df2d98c6f510ce9e0008b268241c4449&units=imperial';

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    // get user input zip code
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;    
    if (zipCode == ''){
        alert('please enter zip code');
        return
    };
    console.log('get input: ',zipCode)
    // use async fun to get weather data from API and POST to the server
    getWeather(baseURL, zipCode, aipKey)
    .then(function(data){
        postData('/add', {'temperature': data.main.temp, 'date': newDate, 'user_experence':feeling});    
    })
    // update new data to web page
    .then(() => updateUI());
};


// to get weather data from API
const getWeather = async (baseURL, zipCode, apiKey) => {
    let apiURL = baseURL + zipCode.toString() + '&appid=' + aipKey;
    // console.log(apiURL);
    const res = await fetch(apiURL);
    try {
        const data = await res.json();         
        console.log('get temperature:',data.main.temp);
        return data;
    }catch(error){
        console.log("error in get weather", error);        
    }
}

// post data
const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials:'same-origin',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)        
    });
    try {
        const newData = await response.json();
        return newData
    }catch(error){
        console.log("error", error);
    }
}

// update web UI
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();        
        console.log(allData);



        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.user_experence;
    }catch(error){
        console.log('updateUI error', error);
    };
};