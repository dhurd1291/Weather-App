let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();
let currentYear = now.getFullYear();
let month = now.getMonth();

if (hour < 10) {
  hour = "0" + hour;
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];

if (minutes < 10) {
  minutes = "0" + minutes;
}


let currentHour = document.querySelector(".currentHour");
currentHour.innerHTML = `${hour}:${minutes}`;

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${currentDay} ${currentMonth} ${date} ${currentYear}`;

function formatDay(timestamp){
  let forecastDate = new Date (timestamp * 1000);
  let forecastDay = forecastDate.getDay();
  let forecastDays = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  ];
  return forecastDays[forecastDay];

}

function searchCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector(".searchBox");
  let cityFound = document.querySelector(".cityFound");
  cityFound.innerHTML = `${searchBox.value}`;
  searchCityName(searchBox.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function searchCityName(city) {
  let apiKey = "03a800de42ff14f94c46560ad0e0b65e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(checkTheWeather);
}

function checkTheWeather(response) {
  let currentTemp = document.querySelector(".currentTemp");
  let roundedTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${roundedTemp}°`;
  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let windSpeed = document.querySelector(".windSpeed");
  let roundWind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed: ${roundWind} MPH`;
  farenheitTemp = response.data.main.temp;
  getForecast(response.data.coord);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((farenheitTemp - 32) * 5) / 9;
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}°C`;
}
function showfahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(farenheitTemp)}°F`;
}

let celsiusLink = document.querySelector(".celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector(".fahrenheitLink");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

let farenheitTemp = null;

function displayForecast(response) {
  
  let forecastElement = document.querySelector(".weather-forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="temp-high"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="temp-low"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  let apiKey = "03a800de42ff14f94c46560ad0e0b65e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}