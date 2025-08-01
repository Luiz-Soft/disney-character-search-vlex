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

export const getCharacters = async (page: number = 1, pageSize: number = 10): Promise<CharactersResponse> => {
  console.log("we got here")
  const response = await api.get(`/character?page=${page}&pageSize=${pageSize}`)
  return response.data
}

export const getCharacterByName = async (name: string): Promise<CharactersResponse> => {
  const response = await api.get(`/character?name=${name}`)
  return response.data
}
