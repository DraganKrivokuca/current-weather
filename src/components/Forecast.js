import '../assets/css/Main.css';
import React from 'react';

const Forecast = ({ date, minTemp, maxTemp, condition, icon }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const positionOfWeek = new Date(date).getDay();
    
    return (
        <div className="ui grid container">
            GAG TEST
            <div className="column">
                <div className="forecast-container">
                    <div className="date">
                        {days[positionOfWeek]}
                    </div>
                    <br />
                    <br />
                    <div className="temperature">
                        Min/Max
                        <br />
                        {Math.floor(minTemp)}/{Math.floor(maxTemp)}°C
                    </div>
                    <div className="more">
                        <img alt="weatherapi.com" src={icon} />
                        <br />
                        {condition}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forecast;