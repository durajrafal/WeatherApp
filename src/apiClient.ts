import config from '../dist/config.json';
import { CurrentWeather, ApiError } from './types/apiTypes';

type ApiParameter = {
  name: string;
  value: string;
};

export class WeatherApiClient {
  private readonly baseURL = 'https://api.weatherapi.com/v1';
  private readonly apiKey = config.apiKey;

  public async GetCurrentWeather(
    location: string
  ): Promise<CurrentWeather | ApiError> {
    const url = this.CreateCurrentEndpointUrl(location);
    let response: Response | undefined = undefined;
    try {
      response = await fetch(url);
    } catch (error) {
      alert(error);
    }

    const data = await response?.json();
    if (response?.ok) {
      return data;
    } else {
      return data.error;
    }
  }

  private CreateCurrentEndpointUrl(location: string) {
    const endpoint = '/current.json';
    const parameters = new Array<ApiParameter>();
    parameters.push({ name: 'q', value: location });
    return this.CreateUrl(endpoint, parameters);
  }

  private CreateUrl(endpoint: string, parameters: Array<ApiParameter>) {
    const parametersUrl = this.CreateParametersStringForUrl(parameters);
    return this.baseURL + endpoint + '?key=' + this.apiKey + parametersUrl;
  }

  private CreateParametersStringForUrl(parameters: Array<ApiParameter>) {
    let parametersUrl = '';
    parameters.forEach(
      (param) => (parametersUrl += '&' + param.name + '=' + param.value)
    );
    return parametersUrl;
  }
}

export default WeatherApiClient;
