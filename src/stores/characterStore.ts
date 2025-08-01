import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCharacters, type Character } from '@/services/charactersService'

export const useCharacterStore = defineStore('character', () => {
  const search = ref('')
  const loading = ref(false)
  const results = ref<Character[]>([])

const searchCharacters = async () => {
  if (!search.value) {
    results.value = []
    return
  }

  loading.value = true
  try {
    const res = await getCharacters(1, 10)
    results.value = res.data.filter(c =>
      c.name.toLowerCase().includes(search.value.toLowerCase())
    )
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
    searchCharacters,
  }
})
