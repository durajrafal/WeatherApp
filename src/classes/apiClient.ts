import config from '../../dist/config.json';
import type { CurrentWeather, ApiError, ForecastWeather } from '../types/apiTypes';

type ApiParameter = {
  name: string;
  value: string;
};

export class WeatherApiClient {
  private readonly baseURL = 'https://api.weatherapi.com/v1';
  private readonly apiKey = config.apiKey;

  public async GetCurrentWeather(location: string): Promise<CurrentWeather | ApiError> {
    const url = this.CreateCurrentEndpointUrl(location);
    return await this.MakeApiCall(url);
  }

  public async GetForecastWeather(location: string): Promise<ForecastWeather | ApiError> {
    const url = this.CreateForecastEndpointUrl(location);
    return await this.MakeApiCall(url);
  }

  private async MakeApiCall(url: string) {
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

  private CreateForecastEndpointUrl(location: string) {
    const endpoint = '/forecast.json';
    const parameters = new Array<ApiParameter>();
    parameters.push({ name: 'q', value: location });
    parameters.push({ name: 'days', value: '7' });
    return this.CreateUrl(endpoint, parameters);
  }

  private CreateUrl(endpoint: string, parameters: Array<ApiParameter>) {
    const parametersUrl = this.CreateParametersStringForUrl(parameters);
    return this.baseURL + endpoint + '?key=' + this.apiKey + parametersUrl;
  }

  private CreateParametersStringForUrl(parameters: Array<ApiParameter>) {
    let parametersUrl = '';
    parameters.forEach((param) => (parametersUrl += '&' + param.name + '=' + param.value));
    return parametersUrl;
  }
}

export default WeatherApiClient;
