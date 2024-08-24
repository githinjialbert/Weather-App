const inputMajorCities = document.getElementById("major-city");
const searchBtn = document.getElementById("search-button");
const weatherDetails = document.getElementById("weather-details");
const locationCities = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const apiKey = "";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const BASE_API = apiUrl;
const API_KEY = apiKey;
const UNITS = "metric";

const fetchWeather = async (location) => {
    const url = `${BASE_API}?q=${location}&appid=${API_KEY}&units=${UNITS}`;
    console.log('Fetching URL:', url); // Log the URL being fetched

    try {
        const response = await fetch(url);
        const rawResponse = await response.text();
        console.log('Raw API Response:', rawResponse); // Log the raw response from the API

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = JSON.parse(rawResponse); // Parse the raw response
        console.log('Parsed Data:', data); // Log the parsed data

        if (data && data.name && data.main && data.weather && data.weather[0]) {
            updateWeather(data);
            inputMajorCities.value = ''; // Clear the input field after successful search
        } else {
            throw new Error('Unexpected data structure');
        }

    } catch (error) {
        handleFetchError(error);
    }
};

const updateWeather = (data) => {
    locationCities.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
};

const handleFetchError = (error) => {
    console.error('Error fetching weather data:', error);
    locationCities.textContent = "Unable to fetch weather data";
    temperature.textContent = "";
    description.textContent = "";
};

searchBtn.addEventListener("click", () => {
    const location = inputMajorCities.value;
    if (location) {
        fetchWeather(location);
    }
});
