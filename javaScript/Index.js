const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

/*function fToC(fahrenheit) {
  var fTemp = fahrenheit;
  var fToCel = ((fTemp - 32) * 5) / 9;
  return fToCel;
}*/

search.addEventListener("click", async () => {
  const APIKey = "862afcaaefe7401a00e7c7a1d69c5a09";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  const urlCountry = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

  console.log(urlCountry);
  const requestCountryInfo = await fetch(urlCountry)
    .then((response) => response.json())
    .then((data) => data[0]);

  console.log(requestCountryInfo);
  if (requestCountryInfo != null) {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${requestCountryInfo.lat}&lon=${requestCountryInfo.lon}&units=metric&appid=${APIKey}`;

    const requestCountryWeather = await fetch(urlWeather)
      .then((response) => response.json())
      .then((data) => data);

    console.log(requestCountryWeather);

    error404.style.display = "none";
    error404.classList.remove("fadeIn");

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperatura");
    const description = document.querySelector(".weather-box .descricao");
    const humidity = document.querySelector(".weather-details .humidade span");
    const wind = document.querySelector(".weather-details .vento span");

    switch (requestCountryWeather.weather[0].main) {
      case "Clear":
        image.src = "img/clear.png";
        break;

      case "Rain":
        image.src = "img/rain.png";
        break;

      case "Snow":
        image.src = "img/snow.png";
        break;

      case "Clouds":
        image.src = "img/cloud.png";
        break;

      case "Haze":
        image.src = "img/mist.png";
        break;

      default:
        image.src = "";
    }

    // const tempConvert = fToC(parseInt(requestCountryWeather.main.temp));

    temperature.innerHTML = `${parseInt(
      requestCountryWeather.main.temp
    )}<span>°C</span>`;
    description.innerHTML = `${requestCountryWeather.weather[0].description}`;
    humidity.innerHTML = `${requestCountryWeather.main.humidity}%`;
    wind.innerHTML = `${parseInt(requestCountryWeather.wind.speed)}Km/h`;

    weatherBox.style.display = "";
    weatherDetails.style.display = "";
    weatherBox.classList.add("fadeIn");
    weatherDetails.classList.add("fadeIn");
    container.style.height = "590px";
  } else {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
  }
});
