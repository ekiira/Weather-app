import './styles/style.css';
// import dotenv from 'dotenv';

// dotenv.config()
const form = document.querySelector('form');
const namee = document.querySelector('input[search-city]');
const loader = document.querySelector(".loader");

const key = process.env.API_KEY

let lat;
let lon;
form.addEventListener('submit', async (e) => {
  e.preventDefault();

 
const searchData = namee.value;

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const url1 = `http://api.openweathermap.org/data/2.5/weather?q=${searchData}&units=metric&APPID=${key}`
const response = await fetch(proxyUrl + url1 , {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
    }
  });

  const finalResponse = await response.json();
  lat = finalResponse.coord.lat;
  lon = finalResponse.coord.lon

  if(lat || lon) {
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`

      const response2= await fetch(proxyUrl + url2 , {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
        }
      });
      const finalResponse2 = await response2.json();

      console.log('dddd', lat, lon, finalResponse2)
  }
});
  