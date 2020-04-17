const apiKey = 'bf0eea23c1b653273e0023f6a8f41df6';
const basicUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const getData = (e) => {
    //Obtain data from API
    e.preventDefault();
    const date = dateFormat();
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    //Main logic - chained promises
    getWeather(basicUrl, zipCode, apiKey)
    .then((res) => {
        postWeather('/add', {date: date,
            temp: res.main.temp,
            content: content});
    })
    .then(() => updateUI())
    .catch((e) => console.log('Error: ', e));
};
//Attach button event listener for user input
document.getElementById('generate').addEventListener('click', getData);

const getWeather = async (url, zip, key) => {
    //Get function
    const response = await fetch(url + zip + '&appid=' + key + '&units=imperial');
    try {
        const data = await response.json();
        return data;
    } catch (e){
        console.log('Error: ', e);
    }
};

const postWeather = async (url, dataObj={}) => {
    //Post function
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj)
      });

        try {
            const newData = await response.json();
            return newData;
        }catch(error) {
            console.log("error", error);
        }
};

const updateUI = async () => {
    //Update ui with obtained data
    const request = await fetch('/all');
    try {
        const allInfo = await request.json();
        const elements = document.querySelectorAll('.uiData');
        //Custom prefix/suffix
        const fixes = ['', '&deg;F', 'Dear Diary, '];
        elements.forEach((e, index) => {
            let key = e.id;
            if(key !== 'temp'){
                e.innerHTML = `${fixes[index]} <span>${allInfo[key]}</span>`;
            } else {
                e.innerHTML = allInfo[key] + fixes[index];
            }
        })
        //Show results
        showDisplay();
    } catch(e) {
        console.log('Error: ', e);
    }
};

const showDisplay = () => {
    //Make side panel with results visible
    const display = document.querySelector('.display');
    if(display.style.width === '' || display.style.width === '0px') {
        display.style.width = '100vw';
    } else {
        display.style.width = '0px';
    }
};
//Attach close icon event listener to hide side panel
document.querySelector('.close').addEventListener('click', showDisplay);

const dateFormat = () => {
    //Custom date format function
    const d = new Date();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
        'Saturday'
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;

}


