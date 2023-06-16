import { WeatherApiClient } from './apiClient';
import DisplayManager from './display';

const client = new WeatherApiClient();
const display = new DisplayManager();

const searchButton = document.querySelector('[data-search-btn]');
const location = document.querySelector('[data-location]') as HTMLInputElement;
searchButton?.addEventListener('click', () => {
  updateWeather(location?.value);
  location.value = '';
});
location?.addEventListener('keypress', (e) => {
  const keyEvent = e as KeyboardEvent;
  if (keyEvent.key === 'Enter') {
    updateWeather(location?.value);
    location.blur();
    location.value = '';
  }
});
updateWeather('Cracow');

function updateWeather(location: string) {
  if (!location) display.showValidationError();
  else {
    client.GetCurrentWeather(location).then((res) => display.updateDisplay(res));
  }
}
