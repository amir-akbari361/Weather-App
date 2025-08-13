const apiKey = "YOUR_API_KEY_HERE";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  getWeatherByCity(cityInput.value);
});
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeatherByCity(cityInput.value);
  }
});

async function getWeatherByCity(city) {
  if (!city) return alert("Please enter a city name");

  try {
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById(
      "city"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById(
      "humidity"
    ).textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById(
      "wind"
    ).textContent = `Wind: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = "block";

    const condition = data.weather[0].main.toLowerCase();
    document.body.className = "";
    document.body.classList.add(condition);
  } catch (error) {
    alert(error.message);
  }
}
