import React, { useState, useEffect, useRef } from 'react';
import './GetCity.css'

const GetCity = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchWeather = () => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=0fd360f900574f939fd221857242105&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => setWeather(data.current))
        .catch(error => console.error('Error fetching weather:', error));
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const changeHandler = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
        <h1>Weather</h1>
        <input
            ref={inputRef}
            value={city}
            onChange={changeHandler}
            placeholder="Enter city here..."
        />
        {weather ? (
            <p>
            Temperature: {weather.temp_c}°C
            <br />
            Condition: {weather.condition.text}
            </p>
        ) : (
            <p>Enter a city to get weather information.</p>
        )}
    </div>
  );
};

export default GetCity;