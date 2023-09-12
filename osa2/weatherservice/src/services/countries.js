import axios from "axios"

const apiURL = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountries = () => {
    const request = axios.get(`${apiURL}/all`).then(response => response.data)
    return request
}

export default {getAllCountries}