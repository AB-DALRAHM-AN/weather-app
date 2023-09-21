let apiKey = "8c8e0314838ac666855528f1b7b17b15";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let input = document.querySelector(".search input");
let button = document.querySelector(".search button");
let weatherS = document.querySelector(".body .status i");
let degree = document.querySelector(".body .degree");
let name = document.querySelector(".body .city");
let humidityD = document.querySelector(".humidity span .humidityD");
let windS = document.querySelector(".wind span .windS");

const weatherIcons = {
  "Clouds": "fa-cloud",
  "Clear": "fa-rainbow",
  "Rain": "fa-cloud-rain",
  "Snow": "fa-snowflake",
  "Mist": "fa-smog",
  "Drizzle": "fa-cloud-rain",
  "Thunderstorm": "fa-bolt",
  "Haze": "fa-smog",
  "Fog": "fa-smog",
  "Smoke": "fa-smog",
  "Dust": "fa-smog",
  "Sand": "fa-smog",
  "Ash": "fa-smog",
  "Squall": "fa-smog",
  "Tornado": "fa-smog",
};

button.addEventListener("click", () => {
  let inputValue = `${input.value}`;
  if (inputValue == "") {
    alert("Please Enter City Name");
  } else {
    fetch(apiUrl + `&appid=${apiKey}&q=${inputValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((full) => {
        let temp = full.main.temp;
        let status = full.weather[0].description;
        let city = full.name;
        let humidity = full.main.humidity;
        let windSpeed = full.wind.speed;
        let localTime = new Date(full.dt * 1000);
        let isDaytime = isDaytimeNow(localTime);
        addContent(temp, city, humidity, windSpeed, status, isDaytime);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

function isDaytimeNow(localTime) {
  const currentHour = localTime.getHours();
  return currentHour >= 6 && currentHour < 18;
}

function addContent(temp, city, humidity, windSpeed, status, isDaytime) {
  let iconClass = weatherIcons[status];
  if (!iconClass) {
    iconClass = "fa-question";
  }
  weatherS.className = `fas ${iconClass}`;
  degree.innerHTML = `${Math.round(temp)}°C`;
  name.innerHTML = city;
  humidityD.innerHTML = `${humidity}%`;
  windS.innerHTML = `${windSpeed}km/h`;
  document.body.className = isDaytime ? "day" : "night";
  input.value = "";
};