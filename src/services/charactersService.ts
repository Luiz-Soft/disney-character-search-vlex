import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_DISNEY_API_URL,
})

export interface Character {
  _id: number
  name: string
  imageUrl: string
  films: string[]
}

export interface CharactersResponse {
  data: Character[]
  count: number
  totalPages: number
  previousPage: string | null
  nextPage: string | null
}

export const getCharacters = async (page: number = 1, limit: number = 10): Promise<CharactersResponse> => {
  const response = await api.get(`/character?page=${page}&limit=${limit}`)
  return response.data
}

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get(`/character/${id}`)
  return response.data
}
