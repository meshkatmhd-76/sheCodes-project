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
  let apiKey = "af6a804694288a585eot3deb4501bd15";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function displayName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
function getForcast(city) {
  let apiKey = "af6a804694288a585eot3deb4501bd15";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForcast);
}
function showCurrentTemp(response) {
  let city = document.querySelector("#city-name");
  let degree = document.querySelector("#degree");
  let desc = document.querySelector("#description");
  let windShow = document.querySelector("#wind");
  let humidityShow = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  celciusTemperature = Math.round(response.data.temperature.current);
  degree.innerHTML = celciusTemperature;
  desc.innerHTML = response.data.condition.description;
  windShow.innerHTML = response.data.wind.speed;
  humidityShow.innerHTML = response.data.temperature.humidity;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForcast(response.data.city);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "af6a804694288a585eot3deb4501bd15";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function getCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let temperatureElement = document.querySelector("#degree");
//   let fahrenheiTemperature = (celciusTemperature * 9) / 5 + 32;
//   temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
// }
// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let temperatureElement = document.querySelector("#degree");
//   temperatureElement.innerHTML = celciusTemperature;
// }
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showForcast(response) {
  let forcast = response.data.daily;
  console.log(forcast);
  let forcastElement = document.querySelector("#weather-forecast");
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function (forcastDay,index) {
    if(index < 6){
    forcastHTML += `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forcastDay.time)}</div>
            <img
            src=${forcastDay.condition.icon_url}
            alt="${forcastDay.condition.icon}"
            width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forcastDay.temperature.maximum
              )}° </span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forcastDay.temperature.minimum
              )}° </span>
            </div>
          </div>
    `;
            }
  });
  forcastHTML += `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

let celciusTemperature = null;
let searchFrom = document.querySelector("#search-from");
searchFrom.addEventListener("submit", displayName);

let getCurrent = document.querySelector("#current-location");
getCurrent.addEventListener("click", getCurrentTemp);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
