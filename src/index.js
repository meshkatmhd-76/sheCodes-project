// 1a
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

function search(city) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function displayName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
function showCurrentTemp(response) {
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  celciusTemperature = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = celciusTemperature;
  let desc = document.querySelector("#description");
  desc.innerHTML = response.data.weather[0].description;
  let windShow = document.querySelector("#wind");
  windShow.innerHTML = response.data.wind.speed;
  let humidityShow = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  humidityShow.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#degree");
  let fahrenheiTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = celciusTemperature;
}
function showForcast() {
  let forcastElement = document.querySelector("#weather-forecast");
  let forcastHTML = `<div class="row">`;
  let days = ["mon", "tue", "wed", "thu", "fri", "sat"];
  days.forEach(function (day) {
    forcastHTML += `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
            <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> 18° </span>
              <span class="weather-forecast-temperature-min"> 12° </span>
            </div>
          </div>
    `;
  });
  forcastHTML += `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

let celciusTemperature = null;
let searchFrom = document.querySelector("#search-from");
searchFrom.addEventListener("submit", displayName);

let getCurrent = document.querySelector("#current-location");
getCurrent.addEventListener("click", getCurrentTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

showForcast();
search("New York");
