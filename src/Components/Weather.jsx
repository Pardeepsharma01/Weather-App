import React, { useState, useEffect } from "react";
import './Weather.css';
import "bootstrap/dist/css/bootstrap.min.css";

import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png";

const Weather = () => {
  const api_key = "16bd6caa6f47bdfcf2d163af63cdf6fc";

  const [Weathericon, setWeathericon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: "44%",
    windSpeed: "18 km/h",
    temperature: " 25° C",
    location: "Yamuna Nagar",
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput === "") {
      return;
    }

    const fetchWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=Metric&appid=${api_key}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather data:", data);

        const newWeatherData = {
          humidity: `${data.main.humidity} %`,
          windSpeed: `${data.wind.speed} km/h`,
          temperature: `${data.main.temp}°C`,
          location: data.name,
        };
        setWeatherData(newWeatherData);

        const weatherIconCode = data.weather[0].icon;

        if (weatherIconCode === "01d" || weatherIconCode === "01n") {
          setWeathericon(clear_icon);
        } else if (weatherIconCode === "02d" || weatherIconCode === "02n") {
          setWeathericon(cloud_icon);
        } else if (
          weatherIconCode === "03d" ||
          weatherIconCode === "03n" ||
          weatherIconCode === "04d" ||
          weatherIconCode === "04n"
        ) {
          setWeathericon(drizzle_icon);
        } else if (
          weatherIconCode === "09d" ||
          weatherIconCode === "09n" ||
          weatherIconCode === "10d" ||
          weatherIconCode === "10n"
        ) {
          setWeathericon(rain_icon);
        } else if (weatherIconCode === "13d" || weatherIconCode === "13n") {
          setWeathericon(snow_icon);
        } else {
          setWeathericon(clear_icon);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [searchInput]);

  const handleSearch = () => {
    setSearchInput(document.getElementsByClassName("cityInput")[0].value);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={Weathericon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

