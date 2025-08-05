const apikey = "d19d8e77546a68288e5ea2501e8f03d5";

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Set text content
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    // Update weather icon
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain === "clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weatherMain === "clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherMain === "drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain === "mist") {
      weatherIcon.src = "images/mist.png";
    } else if (weatherMain === "snow") {
      weatherIcon.src = "images/snow.png";
    } else if (weatherMain === "rain") {
      weatherIcon.src = "images/rain.png";
    } else {
      weatherIcon.src = "images/clear.png"; // default
    }

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("City not found. Please enter a valid city.");
  }
}

function searchCity() {
  const cityInput = document.querySelector(".input-city").value;
  if (cityInput !== "") {
    checkWeather(cityInput);
  }
}

// Load default city
checkWeather("Multan,PK");
