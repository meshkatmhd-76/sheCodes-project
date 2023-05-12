// 1
function showDate(dateIndex) {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[dateIndex];
}
let now = new Date();
let dayName = showDate(now.getDay());
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = hours + ":" + minutes;
let showTime = document.querySelector("#show-time");
showTime.innerHTML = dayName + " " + time;
// 2
function displayName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function showCurrentTemp(response) {
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = temp;
  let desc = document.querySelector("small");
  desc.innerHTML = response.data.weather[0].description;
  let windShow = document.querySelector("#wind");
  windShow.innerHTML = response.data.wind.speed;
  let humidityShow = document.querySelector("#humidity");
  humidityShow.innerHTML = response.data.main.humidity;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function getCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchFrom = document.querySelector("#search-from");
searchFrom.addEventListener("submit", displayName);

let getCurrent = document.querySelector("#current-location");
getCurrent.addEventListener("click", getCurrentTemp);
