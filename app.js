let apiKey = "8c8e0314838ac666855528f1b7b17b15";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let input = document.querySelector(".search input");
let button = document.querySelector(".search button");
let weatherS = document.querySelector(".body .status");
let degree = document.querySelector(".body .degree");
let cityName = document.querySelector(".body .city");
let humidityD = document.querySelector(".humidity span .humidityD");
let windS = document.querySelector(".wind span .windS");

fetch("status.json")
  .then((response) => response.json())
  .then((data) => {
    const dataWeather = data;
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
            addContent(temp, city, humidity, windSpeed, status, dataWeather);
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });

    function addContent(temp, city, humidity, windSpeed, status, dataWeather) {
      let iconClass = dataWeather[status];
      if (iconClass === undefined) {
        iconClass = "fa-solid fa-cloud";
      }
      weatherS.innerHTML = "";
      document.createElement("i");
      let icon = document.createElement("i");
      icon.classList = iconClass;
      weatherS.appendChild(icon);
      degree.innerHTML = `${Math.round(temp)}°C`;
      cityName.innerHTML = city;
      humidityD.innerHTML = humidity;
      windS.innerHTML = windSpeed;
    }
  });
