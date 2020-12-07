import './assets/css/Main.css';
import React from 'react';
import CurrentLocation from './components/CurrentLocation';
import CurrentWeather from './components/CurrentWeather';
import Spinner from './components/Spinner';

class Main extends React.Component {

  state = { cords: null, errorMsg: null, weather: null, city: null};

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ cords: position.coords }),
      (err) => this.setState({ errorMsg: err.message })
    );
  }

  renderMain() {
    if (this.state.errorMsg && !this.state.cords) {
      alert('Please accept location request');
    }
    if (!this.state.errorMsg && this.state.cords) {
      return <div></div>
    }
    return <div><Spinner message='Loading ...' /></div>
  }

  setCity = (city) => {
    this.setState({ city: city});
  }

  setWeather = (weather) => {
    this.setState({ weather: weather});
  }

  getSeason = function (month) {
    if (month >= 11) {
      return 'winter';
    }
    if (month >= 2 && month <= 4) {
      return 'spring';
    }
    if (month >= 5 && month <= 7) {
      return 'summer';
    }
    if (month >= 8 && month <= 10) {
      return 'autumn';
    }
  }

  render() {
    const season = this.getSeason(new Date().getMonth());
    return (
      <div>
        {this.renderMain()}
        <div
          className={`Main ${season}`}>
          <main>
            <CurrentLocation location={this.state.cords} city={this.setCity} />
            <CurrentWeather currentCity={this.state.city} currentWeather={this.setWeather} />
          </main>
        </div>
      </div>
    );
  }

}

export default Main;
