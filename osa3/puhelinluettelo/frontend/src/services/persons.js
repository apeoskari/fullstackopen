import axios from "axios";
const baseURL = "/api/persons"

const getAll = () => {
    const request = axios.get(baseURL)
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
    return axios.delete(`${baseURL}/${id}`)
        .then(response => response.data)
        .catch(() => null) // In case backend returns no content
}

export default { getAll, create, update, deletePers }