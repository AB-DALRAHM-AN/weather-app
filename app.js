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
  ["Rain"]: "fa-solid fa-cloud-rain",
  ["Clouds"]: "fa-solid fa-cloud",
  ["Snow"]: "fa-solid fa-snowflake",
  ['sun']: "fa-solid fa-sun",
  ["Clear"]: "fa-solid fa-cloud-sun",
  ["Thunderstorm"]: "fa-solid fa-thunderstorm",
  ["Drizzle"]: "fa-solid fa-cloud-drizzle",
  ["Mist"]: "fa-solid fa-smog",
  ["Smoke"]: "fa-solid fa-smog",
  ["Haze"]: "fa-solid fa-smog",
  ["Dust"]: "fa-solid fa-smog",
  ["Fog"]: "fa-solid fa-fog",
  ["Sand"]: "fa-solid fa-smog",
  ["Ash"]: "fa-solid fa-smog",
  ["Squall"]: "fa-solid fa-wind",
  ["Tornado"]: "fa-solid fa-wind",
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
        let status = full.weather[0].main;
        let city = full.name;
        let humidity = full.main.humidity;
        let windSpeed = full.wind.speed;
        addContent(temp, city, humidity, windSpeed, status);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

function addContent(temp, city, humidity, windSpeed, status) {
  let status = full.weather[0].main.toLowerCase();
// Use the lowercase condition to find the corresponding icon
let iconClass = weatherIcons[status];
// Default to a generic icon if the condition is not found
if (iconClass === undefined) {
  iconClass = "fa-solid fa-cloud";
}
  weatherS.className = `${iconClass}`;
  degree.innerHTML = `${Math.round(temp)}°C`
  name.innerHTML = city;
  humidityD.innerHTML = humidity;
  windS.innerHTML = windSpeed;
}
