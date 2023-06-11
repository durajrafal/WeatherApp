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

type Condition = {
  text: string;
  icon: string;
};

export type ApiError = {
  code: number;
  message: string;
};
