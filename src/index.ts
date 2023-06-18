import { WeatherApiClient } from './classes/apiClient';
import DisplayManager from './classes/display';
import SearchManager from './classes/search';
import './style.css';

const client = new WeatherApiClient();
const display = new DisplayManager();
const search = new SearchManager(client, display);
search.makeInitSearch();
