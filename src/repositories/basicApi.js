import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://observatoire-filieres.azurewebsites.net',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

var Homemade_Cache = {}

async function serverCall(url) {
  if (url in Homemade_Cache) {
    return JSON.parse(JSON.stringify(Homemade_Cache[url]))
  }
  try {
    var results = await apiClient.get(url)
  } catch (error) {
    console.error('serverCall Error', error, 'on url', url)
    return null
  }
  Homemade_Cache[url] = results ? results.data : null

  return JSON.parse(JSON.stringify(Homemade_Cache[url]))
}

export default {
  async getChangeRates() {
    const url = '/taux_de_change/'
    return await serverCall(url)
  }
}
