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

let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
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

let currentDate = document.querySelector(".currentDate");
currentDate.innerHTML = ` ${currentDay} ${currentMonth} ${date} ${currentYear}`;

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
}
