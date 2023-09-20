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
  "few clouds": "fa-cloud-sun",
  "scattered clouds": "fa-cloud",
  "broken clouds": "fa-cloud",
  "shower rain": "fa-cloud-showers-heavy",
  "overcast clouds": "fa-cloud",
  "light rain": "fa-cloud-rain",
  "moderate rain": "fa-cloud-rain",
  "heavy intensity rain": "fa-cloud-rain",
  "very heavy rain": "fa-cloud-rain",
  "extreme rain": "fa-cloud-rain",
  "freezing rain": "fa-cloud-rain",
  "light intensity shower rain": "fa-cloud-rain",
  "heavy intensity shower rain": "fa-cloud-rain",
  "ragged shower rain": "fa-cloud-rain",
  "light intensity drizzle": "fa-cloud-rain",
  "drizzle": "fa-cloud-rain",
  "heavy intensity drizzle": "fa-cloud-rain",
  "light intensity drizzle rain": "fa-cloud-rain",
  "drizzle rain": "fa-cloud-rain",
  "heavy intensity drizzle rain": "fa-cloud-rain",
  "shower rain and drizzle": "fa-cloud-rain",
  "heavy shower rain and drizzle": "fa-cloud-rain",
  "shower drizzle": "fa-cloud-rain",
  "light snow": "fa-snowflake",
  "Snow": "fa-snowflake",
  "Heavy snow": "fa-snowflake",
  "Sleet": "fa-snowflake",
  "Light shower sleet": "fa-snowflake",
  "Shower sleet": "fa-snowflake",
  "Light rain and snow": "fa-snowflake",
  "Rain and snow": "fa-snowflake",
  "Light shower snow": "fa-snowflake",
  "Shower snow": "fa-snowflake",
  "Heavy shower snow": "fa-snowflake",
  "mist": "fa-smog",
  "Smoke": "fa-smog",
  "Haze": "fa-smog",
  "sand/ dust whirls": "fa-smog",
  "fog": "fa-smog",
  "sand": "fa-smog",
  "dust": "fa-smog",
  "volcanic ash": "fa-smog",
  "squalls": "fa-smog",
  "tornado": "fa-smog",
  "clear sky": "fa-cloud",
  "few clouds": "fa-cloud-sun",
  "scattered clouds": "fa-cloud",
  "broken clouds": "fa-cloud",
  "shower rain": "fa-cloud-showers-heavy",
  "overcast clouds": "fa-cloud",
  "light rain": "fa-cloud-rain",
  "moderate rain": "fa-cloud-rain",
  "heavy intensity rain": "fa-cloud-rain",
  "very heavy rain": "fa-cloud-rain",
  "extreme rain": "fa-cloud-rain",
  "freezing rain": "fa-cloud-rain",
  "light intensity shower rain": "fa-cloud-rain",
  "heavy intensity shower rain": "fa-cloud-rain",
  "rain": "fa-cloud-rain",
  "thunderstorm": "fa-bolt",
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
  degree.innerHTML = `${temp}°C`;
  name.innerHTML = `${city}`;
  humidityD.innerHTML = `${humidity}%`;
  windS.innerHTML = `${windSpeed}km/h`;
};