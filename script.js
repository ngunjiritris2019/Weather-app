let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();
date = date < 10 ? "0" + date : date;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#date");
today.innerHTML = `${day}, ${date} ${month} ${year}`;
let time = document.querySelector("#time");
time.innerHTML = `${hours} : ${minutes}`;

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").textContent = ` ${Math.round(
    response.data.main.humidity
  )}`;
  document.querySelector("#wind").textContent = ` ${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#current-HighTemp").innerHTML = ` ${Math.round(
    response.data.main.temp_max
  )}`;
  document.querySelector("#current-LowTemp").innerHTML = ` ${Math.round(
    response.data.main.temp_min
  )}`;
}
function search(event) {
  event.preventDefault();
  let apiKey = "cf25ff98e4a3826d13328976b7728fc4";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function currentPin(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
function currentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "cf25ff98e4a3826d13328976b7728fc4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
let button = document.querySelector("#current-pin");
button.addEventListener("click", currentPin);

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);
