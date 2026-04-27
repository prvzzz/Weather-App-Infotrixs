// API Keys
const weatherApiKey = "d23fd00233ca39054f450307dd5b5f94";

// Array of weather-based background images (guaranteed to work)
const weatherBackgrounds = {
  clear:
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1600&h=900&fit=crop", // Sunny day
  clouds:
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600&h=900&fit=crop", // Cloudy
  rain: "https://images.unsplash.com/photo-1534274988757-a28bf1a4c817?w=1600&h=900&fit=crop", // Rainy
  thunderstorm:
    "https://images.unsplash.com/photo-1535550470264-5dfc12fb4f51?w=1600&h=900&fit=crop", // Storm
  snow: "https://images.unsplash.com/photo-1491002052426-16381578188b?w=1600&h=900&fit=crop", // Snowy
  mist: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&h=900&fit=crop", // Misty
  default:
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1600&h=900&fit=crop", // Default
};

// Function to get background image based on weather
const getBackgroundImage = (weatherMain) => {
  const weather = weatherMain.toLowerCase();
  return weatherBackgrounds[weather] || weatherBackgrounds["default"];
};

// Fetch weather and update UI with real-time wallpaper
fetchWeather = async (city) => {
  try {
    console.log("Fetching weather for:", city);

    // Show loading state
    document.querySelector(".city").innerText = "Loading...";

    let response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        weatherApiKey,
    );

    // Error handling for API response
    if (!response.ok) {
      throw new Error("City not found! Please try again.");
    }

    let data = await response.json();
    console.log("Weather data:", data);

    // Destructure the data
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon, main: weatherMain } = data.weather[0];
    const { speed } = data.wind;

    // Get DOM elements
    const City = document.querySelector(".city");
    const Temperature = document.querySelector(".temp");
    const Icon = document.querySelector(".icon");
    const Description = document.querySelector(".description");
    const Humidity = document.querySelector(".humidity");
    const Speed = document.querySelector(".wind-speed");

    // ✅ REAL-TIME WALLPAPER UPDATE - Gets image based on weather condition
    const backgroundImage = getBackgroundImage(weatherMain);

    // Add fade-out effect before changing background
    document.body.style.opacity = "0.8";

    // Update background with smooth transition
    document.body.style.backgroundImage = `url('${backgroundImage}')`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

    // Fade-in effect
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 200);

    // Update all weather information
    City.innerText = `Weather in ${name}`;
    Temperature.innerText = `${parseInt(temp)}°C`;

    // Set weather icon with error handling
    Icon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    Icon.alt = description;
    Icon.onerror = function () {
      // If image fails to load, hide it
      Icon.style.display = "none";
    };
    Icon.onload = function () {
      // Show icon when it loads successfully
      Icon.style.display = "block";
    };

    Description.innerText = `Cloud Condition: ${description}`;
    Humidity.innerText = `Humidity: ${humidity}%`;
    Speed.innerText = `Wind Speed: ${speed} km/h`;

    console.log("Background updated successfully!");
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".city").innerText = error.message;
    document.querySelector(".temp").innerText = "";
    document.querySelector(".description").innerText = "";
    document.querySelector(".humidity").innerText = "";
    document.querySelector(".wind-speed").innerText = "";
  }
};

// Search button event listener
document.querySelector(".search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.querySelector(".input").value.trim();
  if (city) {
    fetchWeather(city);
    document.querySelector(".input").value = "";
  }
});

// Enter key event listener
document.querySelector(".input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const city = document.querySelector(".input").value.trim();
    if (city) {
      fetchWeather(city);
      document.querySelector(".input").value = "";
    }
  }
});

// Optional: Load default weather on page load
window.addEventListener("load", () => {
  // Uncomment to auto-load a default city
  // fetchWeather("London");
});
