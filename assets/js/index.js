const API_KEY = '77a720e73809ab741a5ab7822f1f337c'
const form = document.querySelector('form');
const namee = document.querySelector('input[search-city]');
const searchInput = document.querySelector('.search-bar');
const weatherCity = document.querySelector(".weather-city")
const weatherDegree = document.querySelector(".weather-degree")
const weatherIcon = document.querySelector('.weather-icon')
const weatherState = document.querySelector('.weather-state')
const weatherHumidity = document.querySelector('.humidity')
const weatherFeelsLike = document.querySelector('.feels-like')
const weatherUvIndex = document.querySelector('.uvi')
const weatherClouds = document.querySelector('.clouds')
const date = document.querySelector('.date')
const weatherCard = document.querySelectorAll('.det')
const background = document.querySelector('.bbg')
const loader = document.querySelector(".loader");
const message  = document.querySelector(".message");
let lat;
let lon;

form.addEventListener('submit', async (e) => {  
  e.preventDefault();
 
  const searchData = namee.value;
  if(searchData) {
    loader.style.display = 'block';
  loader.classList.remove('hidden')
  }

  // Fetch longitude and latitude 
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&units=metric&APPID=${API_KEY}`
  const response = await fetch(proxyUrl + url1 , {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
      }
    });
  const finalResponse = await response.json();

  // error handling
  if (finalResponse.cod === '404') {
    localStorage.clear();

    loader.classList.add('hidden');
    loader.style.display = 'none';

    message.innerHTML = 'City not found, Try again'
  }

// Set longittude and latitude
  lat = finalResponse.coord.lat;
  lon = finalResponse.coord.lon;


  // set search input to initial state
  namee.value = ''

  // Fetch current weather info
  if(lat || lon) {
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_KEY}`

      const response2= await fetch(proxyUrl + url2 , {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
        }
      });
      const finalResponse2 = await response2.json();

      
      // Clear existing data and save new data to localstorage
      localStorage.clear();
      window.location.reload();
      
      localStorage.setItem('currentCity', finalResponse.name); 
      localStorage.setItem('allCurrentData', JSON.stringify(finalResponse2.current)); 
    } 
  });
  
  // Retrieve data from localstorage
  weatherCity.innerHTML = localStorage.getItem('currentCity')
  const currentData = JSON.parse(localStorage.getItem('allCurrentData') )

  if(currentData) {
    loader.classList.add('hidden');
    loader.style.display = 'none';
    let i;
    for (i = 0; i < weatherCard.length; i++) {
      weatherCard[i].style.display = 'block'
    }
  weatherIcon.style.display = 'block'

  const wDegree = Math.round(Number(currentData.temp))
  const wIcon = currentData.weather[0].icon
  const wState = currentData.weather[0].description
  const wStateMain = currentData.weather[0].main
  const humidity =  Math.round(Number(currentData.humidity))
  const feelsLike = Math.round(Number(currentData.feels_like))
  const uv = Math.round(Number(currentData.uvi))
  const clouds = Math.round(Number(currentData.clouds))
  const timestamp = currentData.dt
  const currentDate = new Date(timestamp * 1000).toUTCString()

  // Background change based on weather info
  switch (true) {
    case (wStateMain.includes('Clouds')):
      background.style.backgroundImage = "url('../../assets/images/clouds.jpeg')"
      break;
    case (wStateMain.includes('Rain')):
      background.style.backgroundImage = "url('../../assets/images/rain.jpeg')"
      break;
    case (wStateMain.includes('Thunderstorm')):
      background.style.backgroundImage = "url('../../assets/images/storm.jpeg')"
      break;
    case (wStateMain.includes('Drizzle')):
      background.style.backgroundImage = "url('../../assets/images/drizzle.jpeg')"
      break;
    case (wStateMain.includes('Snow')):
      background.style.backgroundImage = "url('../../assets/images/snow.jpeg')"
      break;
    case (wStateMain.includes('Clear')):
      background.style.backgroundImage = "url('../../assets/images/clear-sky.jpeg')"
      break;
    default:
      background.style.backgroundImage = "url('../../assets/images/bg-2.jpeg')"
      break;
  }


  // UV Index evaluation
  let uvState;
  switch (true) {
      case (uv <= 2):
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
weatherIcon.src = `https://openweathermap.org/img/wn/${wIcon}@2x.png`
weatherState.innerHTML = wState
weatherHumidity.innerHTML =  0 ? humidity : `${humidity}%`

weatherFeelsLike.innerHTML = `${feelsLike}&#176;`
weatherUvIndex.innerHTML = uvState
weatherClouds.innerHTML = 0 ? clouds : `${clouds}%`
date.innerHTML = currentDate.split(' ').slice(0, 4).join(' ');


}
