import { WeatherApiClient } from './apiClient';
import DisplayManager from './display';
import SearchManager from './search';

const client = new WeatherApiClient();
const display = new DisplayManager();
const search = new SearchManager(client, display);
search.makeInitSearch();
