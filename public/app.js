// Personal API Key for OpenWeatherMap API
const apiKey = 'bf0eea23c1b653273e0023f6a8f41df6';
const basicUrl = `api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getData);
/* Function called by event listener */
const getData = () => {
    const zipCode = document.getElementById('zip').value;
    const userInput = document.getElementById('feelings').value;
    getWeather(basicUrl, zipCode, apiKey)
    .then((res) => {
        postWeather('/addWeather', {date: res.date, temp: res.temp, userInput: res.userInput});
    })
    .then(() => updateUI())
    .catch((e) => console.log('Error: ', e));
};
/* Function to GET Web API Data*/
const getWeather = async (url, zip, key) => {
    const response = await fetch(basicUrl);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e){
        console.log('Error: ', e);
    }
};

/* Function to POST data */
const postWeather = async (url, dataObj) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                date: dataObj.date,
                temp: dataObj.temp,
                userInput: dataObj.userInput
            }
        )
    });
    try {
        const data = await request.json();
        return data;
    } catch (e) {
        console.log('Error: ', e)
    }
};


/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/weather');
    try {
        const allInfo = await request.json();
        const elements = getElementsByClassName('uiData');
        for(element of elements){
            element.innerHTML= allInfo[0].element.id;
        }
    } catch(e) {
        console.log('Error: ', e);
    }
};