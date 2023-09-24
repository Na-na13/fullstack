import axios from "axios"

const baseUrl = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl).then(response => response.data)
    return request
}

const addNewPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson).then(response => response.data)
    return request
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const changeNumber = newNumber => {
    const request = axios.put(`${baseUrl}/${newNumber.id}`, newNumber).then(response => response.data)
    return request
}

export default { getAllPersons, addNewPerson, deletePerson, changeNumber, }
