
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

const background = document.querySelector('.bbg')

const loader = document.querySelector(".loader");


let lat;
let lon;

form.addEventListener('submit', async (e) => {  
  e.preventDefault();
 

const searchData = namee.value;
if(searchData) {
  loader.style.display = 'block';
loader.classList.remove('hidden')
}


const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const url1 = `http://api.openweathermap.org/data/2.5/weather?q=${searchData}&units=metric&APPID=${API_KEY}`
const response = await fetch(proxyUrl + url1 , {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
    }
  });

  const finalResponse = await response.json();
  lat = finalResponse.coord.lat;
  lon = finalResponse.coord.lon
  namee.value = ''
  weatherCity.innerHTML = finalResponse.name;
  if(lat || lon) {
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_KEY}`

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
      const wStateMain = finalResponse2.current.weather[0].main
      const humidity =  Math.round(Number(finalResponse2.current.humidity))
      const feelsLike = Math.round(Number(finalResponse2.current.feels_like))
      const uv = Math.round(Number(finalResponse2.current.uvi))
      const clouds = Math.round(Number(finalResponse2.current.clouds))
      const timestamp = finalResponse2.current.dt
      const currentDate = new Date(timestamp * 1000).toUTCString()

      if (finalResponse2) {
        loader.classList.add('hidden');
        loader.style.display = 'none';
      }
      
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
  