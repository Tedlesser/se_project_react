import "./WeatherCard.css";
import {defaultWeatherOptions, weatherOptions} from "../../utils/constants";

import sunny from "../../assets/Day/clear.png";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay && 
      option.condition === weatherData.condition
    );
  });
  
  let weatherOption
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day": "night"];
  } else { 
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={weatherOption?.url} 
           alt={`Card showing ${weatherOption?.day ? "day" : "night"} ${weatherOption?.condition} weather`}
           className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;