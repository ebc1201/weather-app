let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// Dates
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
let hour = now.getHours();
let minutes = now.getMinutes();
let month = now.getMonth();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let p = document.querySelector("p");
p.innerHTML = `${day}, ${hour}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "8ace36d02a2f3b22f1f8a6b1fc8c960e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchCurrent(position) {
  let apiKey = "8ace36d02a2f3b22f1f8a6b1fc8c960e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector(".btn-secondary");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
