const API_KEY = "828bdb5d8b914d7b50a0814fe1dffb2d";
const form = document.getElementById("form");
const renderCities = () => {
  // get recent cities from LS []
  const container = document.getElementById("list");
  container.remove();
  const searchContainer = document.getElementById("search-container");
  $("#search-container").append(` <div id="list" class="row">
  <h2 class="col">recent city</h2>
  </div>`);
  const recentCities = JSON.parse(localStorage.getItem("recentSearch"));
  // if [] is empty then render alert
  if (recentCities !== null) {
    for (i = 0; i < recentCities.length; i++) {
      let cities = recentCities[i];
      $("#list").append(
        `<a class="recent col" data-value="${cities}" id="${i}" href="">${cities}</a>`
      );
      $(`#${i}`).click(handleRecentSearch);
    }
  }
  // else render all recent cities
  // add an event listener on div containing all cities
};

const renderCurrentWeatherData = (input) => {
  // render the current weather data and append to section
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`;

  let data = [];
  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      data = result;

      let iconId = data.weather[0].icon;
      let icon = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

      let name = data.name;
      let windspeed = data.wind.speed;
      let temperature = data.main.temp;
      let tempDate = data.dt;
      let date = moment.unix(tempDate).format("ddd DD-MM");
      let humidity = data.main.humidity;
      currentsWeatherData = [
        icon,
        name,
        windspeed,
        temperature,
        date,
        humidity,
      ];

      let lat = data.coord.lat;
      let lon = data.coord.lon;
      renderForecastWeatherData(lat, lon);
      $("#current-weather").append(`<h1>current weather</h1>
      <div class="current-box">
        <div class="title">
          <div><img src=${icon} class="icon card-img-top" alt="icon" /></div>
          <div><h2>${name}</h2></div>
          <div><h2>${date}</h2></div>
        </div>
        <h1>${temperature} °C</h1>
    
        <div class="flex-column">
          <div class="card-bottom-details">
            <h4 class="items">windspeed: ${windspeed} m/s</h4>
            <h4 class="items">Humidity:${humidity}%</h4>
            <h4 class="items">something</h4>
          </div>
    
          
       </div>
      </div>`);
    });
};

const renderForecastWeatherData = (lat, lon) => {
  // get the lat and lon from current weather data API response
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
  let data = [];
  fetch(forecastWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      data = result;
      const container = document.getElementById("forecast-container");
      for (i = 0; i < 5; i++) {
        let icon = data.daily[i].weather[0].icon;
        let windspeed = data.daily[i].wind_speed;
        let temperature = data.daily[i].temp.day;
        let tempDate = data.daily[i].dt;
        let date = moment.unix(tempDate).format("ddd DD-MM");
        let humidity = data.daily[i].humidity;
        let forecastWeatherData = [
          icon,
          windspeed,
          temperature,
          date,
          humidity,
        ];

        $("#forecast-container").append(` <div class="current-box2">
      <div class="title">
        <div><img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="icon card-img-top" alt="icon" /></div>
        <div><h5>${name}</h5></div>
        <div><h5>${date}</h5></div>
      </div>
      <h5>${temperature}°C</h5>
      
      
      </div>`);
      }
    });
};

const handleFormSubmit = (event) => {
  const container = document.getElementById("all-weather");
  container.remove();
  const main = document.getElementById("main");
  $("main").append(`   <section id="all-weather"class="all-weather">
  <div id="current-weather" class="current-weather">
  
  
  
</div>
<h1>5 day weather forecast</h1>
<div id="forecast-container" class="forecast-container" >
  
        
 

 
</div>
</section>`);
  event.preventDefault();
  // get the city name from input
  let input = document.getElementById("input-text").value;
  // if city name is empty handle that
  storeInLS("recentSearch", input);
  if (input) {
    renderCurrentWeatherData(input);
    renderCities();
  }
  // else render weather data
  else {
    alert("input valid search");
  }
};
const handleRecentSearch = (event) => {
  event.preventDefault();
  const container = document.getElementById("all-weather");
  container.remove();
  const main = document.getElementById("main");
  $("main").append(`   <section id="all-weather"class="all-weather">
  <div id="current-weather" class="current-weather">
  
  
  
</div>
<h1>5 day weather forecast</h1>
<div id="forecast-container" class="forecast-container" >
  
        
 

 
</div>
</section>`);
  event.preventDefault();
  const target = $(event.target);
  // get the city name from inpu

  // if city name is empty handle that
  if (target.is("a")) {
    const input = $(target).attr("data-value");
    renderCurrentWeatherData(input);
  }
};
const storeInLS = (key, value) => {
  //get feedbackResults from LS
  const arrayFromLS = JSON.parse(localStorage.getItem(key));

  //push answer in to array
  arrayFromLS.push(value);

  //set feedbackResults in LS
  localStorage.setItem(key, JSON.stringify(arrayFromLS));
};
const initialiseLocalStorage = () => {
  const recentSearch = JSON.parse(localStorage.getItem("recentSearch"));
  if (!recentSearch) {
    localStorage.setItem("recentSearch", JSON.stringify([]));
  }
};
form.addEventListener("submit", handleFormSubmit);
const onReady = () => {
  initialiseLocalStorage();
  renderCities();
};

$(document).ready(onReady);
