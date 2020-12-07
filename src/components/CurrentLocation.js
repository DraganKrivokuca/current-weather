import '../assets/css/Main.css';
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import axios from 'axios';

function CurrentLocation({ location, city }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const positionOfWeek = new Date().getDay();
    const [currentLocation, setCurrentLocation] = useState(null);


    useEffect(() => {
        if (!location) {
            return <div><Spinner /></div>
        }
        const getLocation = async () => {
            const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`);
            setCurrentLocation(data.city);
            city(data.city)
        };
        getLocation();
    }, [location, city])

    return (
        <div>
            <div className="location-container">
                <div className="location">
                    {currentLocation}
                </div>
                <br />
                <br />
                <div className="date">
                    {days[positionOfWeek]}
                </div>
            </div>
        </div>
    );
}

export default CurrentLocation;