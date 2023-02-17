import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const resquest = axios.delete(`${baseUrl}/${id}`)
    return resquest
}

export default { getAllPersons, addNewPerson, deletePerson }
