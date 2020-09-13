import axios from "axios";

export const getWeather = async (city) => {
  let newWeather = {
    error: false,
    errorMessage: "",
  };
  const response = await axios
    .get(
      `${process.env.REACT_APP_WEATHER_API_URL}?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
    .catch(function (error) {
      newWeather.error = true;
      newWeather.errorMessage = error.response
        ? error.response.data.message
        : error;
    });

  if (response) {
    newWeather.condition = response.data.weather[0].main;
    newWeather.temp = response.data.main.temp;
  }

  return newWeather;
};
