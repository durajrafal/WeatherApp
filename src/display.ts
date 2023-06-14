import { CurrentWeather, ApiError } from './types/apiTypes';

class DisplayManager {
  errorMessage = document.querySelector('[data-error-message]') as HTMLSpanElement;

  public updateDisplay(data: CurrentWeather | ApiError) {
    if (this.isWeatherData(data)) {
      this.updateDisplayWithWeather(data as CurrentWeather);
    } else {
      this.updateDisplayWithApiError(data as ApiError);
    }
  }

  public showValidationError() {
    this.errorMessage.textContent = 'Please enter location.';
  }

  private updateDisplayWithWeather(data: CurrentWeather) {
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
    curTemp.textContent = data.current.temp_c.toFixed(1) + ' °C';
    curLocationCity.textContent = data.location.name;
    curLocationCountry.textContent = data.location.country;
  }

  private updateDisplayWithApiError(data: ApiError) {
    console.log(this.errorMessage);
    this.errorMessage.textContent = data.message;
  }

  private isWeatherData(data: CurrentWeather | ApiError) {
    return 'current' in data;
  }
}

export default DisplayManager;
