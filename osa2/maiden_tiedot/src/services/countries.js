import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/"

const getAll = () => {
    const request = axios.get(`${baseURL}api/all`)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePers = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePers }