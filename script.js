apikey = "d23fd00233ca39054f450307dd5b5f94";

// Async-Await function to return a promise from fetch method

fetchWeather = async (city) => {
  console.log(city);
  let response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=d23fd00233ca39054f450307dd5b5f94"
  );

  let data = await response.json();
  console.log(data);

  // Destructure the data

  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;

  const City = document.querySelector(".city");
  const Temprature = document.querySelector(".temp");
  const Icon = document.querySelector(".icon");
  const Description = document.querySelector(".description");
  const Humidity = document.querySelector(".humidity");
  const Speed = document.querySelector(".wind-speed");
  document.body.style.backgroundImage =
    "url(https://source.unsplash.com/1600x900/?" + city + ")";

  City.innerText = `Weather in ${name}`;
  Temprature.innerText = ` ${parseInt(temp)}°C`;
  Icon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  Description.innerText = `Cloud Condition: ${description}`;
  Humidity.innerText = `Humidity: ${humidity}%`;
  Speed.innerText = `wind Speed: ${speed} km/ph`;
};

document.querySelector(".search-btn").addEventListener("click", (e) => {
  fetchWeather(document.querySelector(".input").value);
  document.querySelector(".input").value = "";
});

document.querySelector(".input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeather(document.querySelector(".input").value);
    document.querySelector(".input").value = "";
  }
});
