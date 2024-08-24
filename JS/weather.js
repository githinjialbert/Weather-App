const inputMajorCities = document.getElementById("major-city");
const searchBtn = document.getElementById("search-button");
const weatherDetails = document.getElementById("weather-details");
const locationCities = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");



const apiKey = "d27a28cc9da683d56a3810c6337ee6eb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const BASE_API = apiUrl;
const API_KEY = apiKey;
const UNITS = "metric";

const fetchWeather = async (location) => {
    const url = `${BASE_API}?q=${location}&appId=${API_KEY}&units=${UNITS}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
    
            throw new Error(`HTTP error! Status: ${response.status}`);
    
        }
    
        const data = await response.json();
    
        if (data && data.name && data.main && data.weather && data.weather[0]) {

            updateWeather(data);

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

}

const handleFetchError = (error) => {

    console.error('Error fetching weather data:', error);
    locationCities.textContent = "Unable to fetch weather data";
    temperature.textContent = "";
    description.textContent = "";


}

searchBtn.addEventListener("click", () => {
    if(inputMajorCities.value) {
        fetchWeather(inputMajorCities.value);
    }
});