const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "862afcaaefe7401a00e7c7a1d69c5a09";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperatura");
      const description = document.querySelector(".weather-box .descricao");
      const humidity = document.querySelector(
        ".weather-details .humidade span"
      );
      const wind = document.querySelector(".weather-box .ventania span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./img/clear.png";
          breaks;

        case "Rain":
          image.src = "./img/rain.png";
          breaks;

        case "Snow":
          image.src = "./img/snow.png";
          breaks;

        case "Clouds":
          image.src = "./img/cloud.png";
          breaks;

        case "Haze":
          image.src = "./img/mist.png";
          breaks;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
