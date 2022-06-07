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


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
  "Dec"
];
let currentMonth = months[now.getMonth()];

if (minutes < 10) {
  minutes = "0" + minutes;
}

console.log(formatAMPM(new Date()));

let currentHour = document.querySelector(".currentHour");
currentHour.innerHTML = `${hour}:${minutes}`;

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${currentDay} ${currentMonth} ${date} ${currentYear}`;

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
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
let windSpeed = document.querySelector(".windSpeed");
let roundWind = Math.round(response.data.wind.speed);
windSpeed.innerHTML=`Wind speed: ${roundWind} MPH`;
farenheitTemp = response.data.main.temp
displayForecast();

}



function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((farenheitTemp - 32) * 5/9);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}°C`;
 
}
function showfahrenheitTemp (event){
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${Math.round(farenheitTemp)}°F`;
}

let celsiusLink = document.querySelector(".celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector(".fahrenheitLink");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

let farenheitTemp = null

function displayForecast() {
  let forecastElement = document.querySelector(".weather-forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="temp-high"> 18° </span>
          <span class="temp-low"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}



displayForecast();



