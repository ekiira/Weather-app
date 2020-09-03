import './styles/style.css';
// import dotenv from 'dotenv';

// dotenv.config()
const form = document.querySelector('form');
const namee = document.querySelector('input[search-city]');
const loader = document.querySelector(".loader");
const weatherCity = document.querySelector(".weather-city")
const weatherDegree = document.querySelector(".weather-degree")
const weatherIcon = document.querySelector('.weather-icon')
const weatherState = document.querySelector('.weather-state')
const weatherHumidity = document.querySelector('.humidity')
const weatherFeelsLike = document.querySelector('.feels-like')
const weatherUvIndex = document.querySelector('.uvi')
const weatherClouds = document.querySelector('.clouds')
const date = document.querySelector('.date')


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
  weatherCity.innerHTML = finalResponse.name;
  if(lat || lon) {
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`

      const response2= await fetch(proxyUrl + url2 , {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
        }
      });
      const finalResponse2 = await response2.json();
      const wDegree = Math.round(Number(finalResponse2.current.temp))
      const wIcon = finalResponse2.current.weather[0].icon
      const wState = finalResponse2.current.weather[0].description
      const humidity =  Math.round(Number(finalResponse2.current.humidity))
      const feelsLike = Math.round(Number(finalResponse2.current.feels_like))
      const uv = Math.round(Number(finalResponse2.current.uvi))
      const clouds = Math.round(Number(finalResponse2.current.clouds))
      const timestamp = finalResponse2.current.dt
      const currentDate = new Date(timestamp * 1000).toUTCString()
      let uvState;
      switch (true) {
          case (uv < 2):
              uvState = 'Low'
              break;
          case (uv <= 5):
              uvState = 'Moderate'
              break;
          case (uv <= 7):
              uvState = 'High'
              break;
          case (uv <= 10):
            uvState = 'Very High'
            break;
          case (uv >= 11):
            uvState = 'Extreme'
            break;
          default:
              uvState = ''
              break;
      }
    
      
      weatherDegree.innerHTML = `${wDegree}&#176`
      weatherIcon.src = `http://openweathermap.org/img/wn/${wIcon}@2x.png`
      weatherState.innerHTML = wState
      weatherHumidity.innerHTML =  0 ? humidity : `${humidity}%`
     
      weatherFeelsLike.innerHTML = `${feelsLike}&#176;`
      weatherUvIndex.innerHTML = uvState
      weatherClouds.innerHTML = 0 ? clouds : `${clouds}%`
      date.innerHTML = currentDate.split(' ').slice(0, 4).join(' ');
      console.log('dddd', finalResponse2, wIcon)
      
  }

});
  