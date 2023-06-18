export type CurrentWeather = {
  location: Location;
  current: Current;
};

type Location = {
  name: string;
  country: string;
  localtime: string;
};

type Current = {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  condition: Condition;
  cloud: number;
};

export type ForecastWeather = {
  current: Current;
  forecast: ForecastDayArr;
  location: Location;
};

type ForecastDayArr = {
  forecastday: Array<ForecastDay>;
};

export type ForecastDay = {
  date: string;
  day: Day;
  astro: Astro;
};

type Day = {
  avgtemp_c: number;
  condition: Condition;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
};

type Astro = {
  sunrise: string;
  sunset: string;
};

type Condition = {
  text: string;
  icon: string;
};

export type ApiError = {
  code: number;
  message: string;
};
