import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const like = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const remove = async (blogObject) => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(
    `${baseUrl}/${blogObject.id}`,
    config,
    blogObject,
  )
  return response.data
}

export default { getAll, create, setToken, like, remove }
