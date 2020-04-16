document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'bf0eea23c1b653273e0023f6a8f41df6';
    const basicUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

    const getData = (e) => {
        e.preventDefault();
        const date = new Date();
        const zipCode = document.getElementById('zip').value;
        const content = document.getElementById('feelings').value;
        console.log(content)
        getWeather(basicUrl, zipCode, apiKey)
        .then((res) => {
            postWeather('/add', {date: date,
                temp: res.main.temp,
                content: content});
        })
        .then(() => updateUI())
        .catch((e) => console.log('Error: ', e));
    };

    document.getElementById('generate').addEventListener('click', getData);

    const getWeather = async (url, zip, key) => {
        const response = await fetch(url + zip + '&appid=' + key);
        try {
            const data = await response.json();
            return data;
        } catch (e){
            console.log('Error: ', e);
        }
    };

    const postWeather = async (url, dataObj={}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
           // Body data type must match "Content-Type" header
            body: JSON.stringify(dataObj),
          });

            try {
              const newData = await response.json();
              return newData;
            }catch(error) {
            console.log("error", error);
            }
        }

    const updateUI = async () => {
        const request = await fetch('/all');
        try {
            const allInfo = await request.json();
            console.log(allInfo)
            const elements = document.querySelectorAll('.uiData');
            elements.forEach((e) => {
                let key = e.id;
                e.innerHTML = allInfo[key];
            })
            showDisplay();
        } catch(e) {
            console.log('Error: ', e);
        }
    };

    const showDisplay = () => {
        //show or hide side menu
        const display = document.querySelector('.display');
        if(display.style.width === '' || display.style.width === '0px') {
            display.style.width = '100vw';
        } else {
            display.style.width = '0px';
        }
    };
});
