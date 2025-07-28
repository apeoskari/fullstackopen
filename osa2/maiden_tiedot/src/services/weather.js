import axios from "axios";
const api_key = import.meta.env.VITE_api_key
// muuttujassa api_key on nyt käynnistyksessä annettu API-avaimen arvo

const getWeather = async (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    const response = await request;
    return response.data;
}

export default { getWeather }