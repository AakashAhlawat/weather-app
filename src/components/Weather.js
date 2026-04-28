import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "a904538d9b9c5ca39807e252bfef54d5";

  function handleOnChange(event) {
    setCity(event.target.value);
    fetchData()
    // to fetch
  }

  async function fetchData() {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      let response = await fetch(url);
      let output = await response.json();

      if (response.ok) {
        setWeather(output);
        setError('');
      } else {
        setError('No data found. Please enter a valid city name');
        setWeather(null);
      }
    } catch (err) {
      setError('Something went wrong');
      setWeather(null);
    }
  }

  return (
    <div className='container'>
      <div className='city'>
        <input
          type='text'
          value={city}
          onChange={handleOnChange}
        
          placeholder='Enter any city'
        />
        <button onClick={fetchData}>
          <FaSearch />
        </button>
      </div>

      {error && <p className='error-message'>{error}</p>}

      {weather && weather.weather && (
        <div className='content'>
          <div className='weather-image'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt='weather icon'
            />
          </div>

          <div><p>{weather.name},<span>{weather.sys.country}</span></p></div>
         
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          
           <div className='weather-stats'>
           <div className='wind'>
           <div className='wind-icon'>
            <FaWind></FaWind>
            </div>
            <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
            <h3 className='wind-heading'>Wind speed</h3>
           </div>
           <div className='humidity'>
           <div className='humidity-icon'>
           <WiHumidity></WiHumidity>       
           
           </div>
           <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
           <h3 className='humidity-heading'>Humidity</h3>

           </div>
           
           </div>

        </div>
      )}
    </div>
  );
};

export default Weather;