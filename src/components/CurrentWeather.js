import '../assets/css/Main.css';
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import api from '../api/api';
import Forecast from './Forecast';

function CurrentWeather({ currentCity, currentWeather }) {

    const [weather, setWeather] = useState(null);

    const API = {
        url: api.API_URL,
        key: api.API_KEY
    }

    useEffect(() => {
        if (currentCity) {
            const getWeather = async () => {
                const { data } = await axios.get(
                    API.url,
                    {
                        params: {
                            q: currentCity,
                            key: API.key,
                            days: 7
                        }
                    },
                    (err) => { console.log('err', err) });
                setWeather(data);
                currentWeather(data.current.temp_c);
            };
            getWeather();
        } else {
            return <div><Spinner /></div>
        }
    }, [currentWeather, currentCity, API.url, API.key]);

    if (weather) {
        const renderForecastItems = weather.forecast.forecastday.map((days) => {
            return <Forecast
                key={days.date_epoch}
                date={days.date}
                minTemp={days.day.mintemp_c}
                maxTemp={days.day.maxtemp_c}
                condition={days.day.condition.text}
                icon={days.day.condition.icon}
                />
        })
        return (
            <div>
                <div className="weather-container">
                    <div className="temperature">
                        {Math.floor(weather.current.temp_c)}°C
                    </div>
                    <div className="weather">
                        <img alt="weatherapi.com" src={weather.current.condition.icon} />
                        <br />
                        {weather.current.condition.text}
                    </div>
                    <div className="weather-more">
                        <div className="more-item">
                            Feels like
                            <div className="value">{Math.floor(weather.current.feelslike_c)} °C</div>
                        </div>
                        <div className="more-item">
                            Precipitation
                            <div className="value">{weather.current.precip_in} %</div>
                        </div>
                        <div className="more-item">
                            Wind
                            <div className="value">{weather.current.wind_kph} km/h</div>
                        </div>
                        <div className="more-item">
                            Humidity
                            <div className="value">{weather.current.humidity} %</div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <hr />
                <div className="forecast">
                    {renderForecastItems}
                </div>
                <hr />
            </div>
        );
    } else {
        return <div><Spinner /></div>
    }
}

export default CurrentWeather;