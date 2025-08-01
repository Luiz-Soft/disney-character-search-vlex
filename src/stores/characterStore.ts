import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCharacters,
  getCharacterByName,
  type Character
} from '@/services/charactersService'

export const useCharacterStore = defineStore('character', () => {
  const search = ref()
  const loading = ref(false)
  const results = ref<Character[]>([])

const searchCharacters = async () => {

  const query = (search.value || '').trim()

  loading.value = true

  try {
    if (!query) {
      const res = await getCharacters(1, 9)
      results.value = res.data
    } else {
      const res = await getCharacterByName(query)
      results.value = res.data.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  } catch (error) {
    console.error('Error fetching characters:', error)
  } finally {
    loading.value = false
  }
}


  return {
    search,
    loading,
    results,
    searchCharacters
  }
})
