import axios from 'axios'
import md5 from 'md5'

const API_KEY = import.meta.env.VITE_APP_MARVEL_PUBLIC_KEY
const PRIVATE_KEY = import.meta.env.VITE_APP_MARVEL_PRIVATE_KEY
const BASE_URL = 'https://gateway.marvel.com/v1/public/'

const marvelApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
})

marvelApi.interceptors.request.use((config) => {
  const ts = Date.now().toString()
  const hash = md5(ts + PRIVATE_KEY + API_KEY)

  config.params = {
    ...config.params,
    ts,
    hash,
  }
  return config
})

export const getCharacters = async (offset = 0, limit = 20, orderBy = null) => {
  try {
    const params = {
      offset,
      limit,
    }
    // Só adiciona orderBy se for fornecido
    if (orderBy) {
      params.orderBy = orderBy
    }
    const response = await marvelApi.get('characters', { params })
    return response.data.data
  } catch (error) {
    console.error('Error fetching characters:', error)
    throw error
  }
}

export const getCharacterById = async (id) => {
  try {
    const response = await marvelApi.get(`characters/${id}`)
    return response.data.data.results[0]
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error)
    throw error
  }
}

export const getCharacterComics = async (id) => {
  try {
    const response = await marvelApi.get(`characters/${id}/comics`, {
      params: {
        orderBy: '-onsaleDate', // Ordena pelos mais recentes primeiro
        limit: 10, // Limita a 10 resultados
      },
    })
    return response.data.data
  } catch (error) {
    console.error(`Error fetching comics for character with id ${id}:`, error)
    throw error
  }
}

export const searchCharacters = async (nameStartsWith, offset = 0, limit = 20) => {
  try {
    const response = await marvelApi.get('characters', {
      params: {
        nameStartsWith,
        offset,
        limit,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error searching characters:', error)
    throw error
  }
}