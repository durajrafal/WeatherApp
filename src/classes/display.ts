import type { CurrentWeather, ApiError, ForecastWeather, ForecastDay } from '../types/apiTypes';
import style from '../style.module.css';
import '../extensionMethods';

class DisplayManager {
  errorMessage = document.querySelector('[data-error-message]') as HTMLSpanElement;

  public updateDisplay(data: CurrentWeather | ForecastWeather | ApiError) {
    if (this.hasCurrentWeatherData(data)) {
      this.updateDisplayWithCurrentWeather(data as CurrentWeather);
      if (this.hasForecastWeatherData(data)) {
        this.updateDisplayWithForecastWeather(data as ForecastWeather);
      }
    } else {
      this.updateDisplayWithApiError(data as ApiError);
    }
  }

  public showValidationError() {
    this.errorMessage.textContent = 'Please enter location.';
  }

  private updateDisplayWithCurrentWeather(data: CurrentWeather) {
    this.errorMessage.textContent = '';
    data = data as CurrentWeather;
    const curTemp = document.querySelector('[data-current-temperature]') as HTMLOutputElement;
    const curLocationCity = document.querySelector(
      '[data-current-location-city]'
    ) as HTMLOutputElement;
    const curLocationCountry = document.querySelector(
      '[data-current-location-country]'
    ) as HTMLOutputElement;
    const image = document.querySelector('[data-current-weather-img]') as HTMLImageElement;
    image.src = data.current.condition.icon;
    curTemp.textContent = data.current.temp_c.toFixed(1).asCelciusDegree();
    curLocationCity.textContent = data.location.name;
    curLocationCountry.textContent = data.location.country;
  }

  private updateDisplayWithForecastWeather(data: ForecastWeather) {
    const forecast = document.querySelector('[data-forecast]') as HTMLDivElement;
    forecast.classList.add(style['flex-center-horizontal']);
    forecast.classList.add(style['justify-content-space-evenly']);
    data.forecast.forecastday.forEach((forecastday) => {
      console.log(forecastday);
      forecast.appendChild(this.createForecastDaysWeather(forecastday));
    });
  }

  private createForecastDaysWeather(forecastDay: ForecastDay) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add(style['flex-column']);
    parentDiv.classList.add(style['flex-center-vertical']);

    const header = document.createElement('h3');
    const dateSplitted = forecastDay.date.split('-');
    header.textContent = dateSplitted[2] + '-' + dateSplitted[1];
    parentDiv.appendChild(header);

    const temperature = document.createElement('output');
    temperature.textContent = forecastDay.day.avgtemp_c.toFixed(1).asCelciusDegree();
    parentDiv.appendChild(temperature);

    return parentDiv;
  }

  private updateDisplayWithApiError(data: ApiError) {
    this.errorMessage.textContent = data.message;
  }

  private hasCurrentWeatherData(data: CurrentWeather | ForecastWeather | ApiError) {
    return 'current' in data;
  }

  private hasForecastWeatherData(data: CurrentWeather | ForecastWeather | ApiError) {
    return 'forecast' in data;
  }
}

export default DisplayManager;
