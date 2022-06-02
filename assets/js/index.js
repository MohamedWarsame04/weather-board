const API_KEY = "828bdb5d8b914d7b50a0814fe1dffb2d";
const form = document.getElementById("form");
const renderCities = () => {
  // get recent cities from LS []
  // if [] is empty then render alert
  // else render all recent cities
  // add an event listener on div containing all cities
};

const renderCurrentWeatherData = (input) => {
  // render the current weather data and append to section
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`;
  console.log(weatherUrl);
  let data = [];
  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      data = result;

      let icon = data.weather[0].icon;
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
      console.log(currentsWeatherData);
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      renderForecastWeatherData(lat, lon);
      $("#current-weather").append(`<div class="current-weather">
  <h1>current weather</h1>
  <div class="current-box">
    <div class="title">
      <div><img src="${icon}" class="icon card-img-top" alt="icon" /></div>
      <div><h2>${name} </h2></div>
      <div><h2>${date}</h2></div>
    </div>
    <h1>${temperature}</h1>

    <div class="flex-column">
      <div class="card-bottom-details">
        <h4 class="items">windspeed</h4>
        <h4 class="items">humidity</h4>
        <h4 class="items">uvindex</h4>
      </div>

      <div class="card-bottom-details">
        <h5 class="items">${windspeed}</h5>
        <h5 class="items">${windspeed}</h5>
        <h5 class="items">uvindex</h5>
      </div>
      
   </div>
  </div>
  
  
</div>`);
    });
};
const renderCurrentWeather = (currentsWeatherData) => {
  let container = document.getElementById("current-weather");
  $("#current-weather").append(`<h1>current weather</h1>
  <div class="current-box">
    <div class="title">
      <div><img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="icon card-img-top" alt="icon" /></div>
      <div><h2>${name}</h2></div>
      <div><h2>${date}</h2></div>
    </div>
    <h1>${temperature}</h1>

    <div class="flex-column">
      <div class="card-bottom-details">
        <h4 class="items">${windspeed}</h4>
        <h4 class="items">${humidity}</h4>
        <h4 class="items">uvindex</h4>
      </div>

      <div class="card-bottom-details">
        <h5 class="items">windspeed</h5>
        <h5 class="items">humidity</h5>
        <h5 class="items">uvindex</h5>
      </div>
      
   </div>
  </div>`);
};
const renderForecastWeather = (forecastWeatherData) => {
  const container = document.getElementById("forecast-container");

  $("#forecast-container").append(` <div class="current-box2">
<div class="title">
  <div><img src="..." class="icon card-img-top" alt="icon" /></div>
  <div><h5>name</h5></div>
  <div><h5>date</h5></div>
</div>
<h5>20c</h5>


</div>`);
};
const renderForecastWeatherData = (lat, lon) => {
  // get the lat and lon from current weather data API response
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${API_KEY}`;
  console.log(forecastWeatherUrl);
  let data = [];
  fetch(forecastWeatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      data = result;
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

        renderForecastWeather(forecastWeatherData);
      }
    });
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  // get the city name from input
  let input = document.getElementById("input-text").value;
  // if city name is empty handle that
  if (input) {
    renderCurrentWeatherData(input);
  }
  // else render weather data
  else {
    alert("input valid search");
  }
};
form.addEventListener("submit", handleFormSubmit);
const onReady = () => {
  // render recent cities
};

$(document).ready(onReady);
