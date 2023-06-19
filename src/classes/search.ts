import WeatherApiClient from './apiClient';
import DisplayManager from './display';

class SearchManager {
  searchButton = document.querySelector('[data-search-btn]');
  location = document.querySelector('[data-location]') as HTMLInputElement;
  client: WeatherApiClient;
  display: DisplayManager;

  constructor(apiClient: WeatherApiClient, displayManager: DisplayManager) {
    this.searchButton?.addEventListener('click', () => {
      this.updateWeather(this.location?.value);
    });
    this.location?.addEventListener('keypress', (e) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'Enter') {
        this.updateWeather(this.location?.value);
      }
    });
    this.client = apiClient;
    this.display = displayManager;
  }

  private updateWeather(location: string) {
    if (!location) this.display.showValidationError();
    else {
      this.location.value = '';
      this.location.blur();
      this.client.GetForecastWeather(location).then((res) => this.display.updateDisplay(res));
    }
  }

  public makeInitSearch() {
    this.updateWeather('Cracow');
  }
}

export default SearchManager;
