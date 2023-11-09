import axios from 'axios'

const apiKey = process.env.REACT_APP_WEATHER_KEY

const getWeather = (latlng) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}&units=metric`
  const weather = axios.get(apiURL).then(response => response.data)
  return weather
}

const  getIcon = (id) => {
  const icon = `https://openweathermap.org/img/wn/${id}@2x.png`
  return icon
}

export default { getWeather, getIcon }