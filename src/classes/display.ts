import type { CurrentWeather, ApiError, ForecastWeather, ForecastDay } from '../types/apiTypes';
import '../extensionMethods';
import forecastStyle from '../forecastStyles.module.css';

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
    forecast.textContent = '';
    data.forecast.forecastday.forEach((forecastday) => {
      forecast.appendChild(this.createForecastDaysWeather(forecastday));
    });
  }

  private createForecastDaysWeather(data: ForecastDay) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('flex-column');
    parentDiv.classList.add('flex-center-vertical');
    parentDiv.classList.add(forecastStyle.forecastDay);

    const header = document.createElement('h3');
    const dateSplitted = data.date.split('-');
    header.textContent = dateSplitted[2] + '-' + dateSplitted[1];
    parentDiv.appendChild(header);

    const temperatureDiv = document.createElement('div');
    temperatureDiv.classList.add('flex-center-vertical');
    temperatureDiv.classList.add('justify-content-space-between');
    const icon = document.createElement('img');
    icon.src = data.day.condition.icon;
    icon.width = 32;
    temperatureDiv.appendChild(icon);
    const temperature = document.createElement('output');
    temperature.textContent = data.day.avgtemp_c.toFixed(1).asCelciusDegree();
    temperatureDiv.appendChild(temperature);
    parentDiv.appendChild(temperatureDiv);

    const sunriseDiv = document.createElement('div');
    sunriseDiv.classList.add('flex-center-vertical');
    sunriseDiv.classList.add('justify-content-space-between');
    sunriseDiv.classList.add('gap-10');
    const sunriseIcon = document.createElement('span');
    sunriseIcon.classList.add('material-icons-round');
    sunriseIcon.textContent = 'wb_twilight';
    sunriseDiv.appendChild(sunriseIcon);
    const sunrise = document.createElement('output');
    sunrise.textContent = data.astro.sunrise.to24h();
    sunriseDiv.appendChild(sunrise);
    parentDiv.appendChild(sunriseDiv);

    const sunsetDiv = document.createElement('div');
    sunsetDiv.classList.add('flex-center-vertical');
    sunsetDiv.classList.add('justify-content-space-between');
    sunsetDiv.classList.add('gap-10');
    const sunsetIcon = document.createElement('span');
    sunsetIcon.classList.add('material-icons-round');
    sunsetIcon.textContent = 'nightlight_round';
    sunsetDiv.appendChild(sunsetIcon);
    const sunset = document.createElement('output');
    sunset.textContent = data.astro.sunset.to24h();
    sunsetDiv.appendChild(sunset);
    parentDiv.appendChild(sunsetDiv);

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
