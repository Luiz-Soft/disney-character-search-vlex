import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCharacters,
  getCharacterByName,
  type Character
} from '@/services/charactersService'

export const useCharacterStore = defineStore('character', () => {
  const search = ref('')
  const loading = ref(false)
  const results = ref<Character[]>([])
  const page = ref(1)
  const totalPages = ref(1)
  const itemsPerPage = ref(9)

  const searchCharacters = async (newPage: number) => {
    if (newPage) {
      page.value = newPage
    } else {
      page.value = 1
    }

    const query = (search.value || '').trim()
    loading.value = true

    try {
      if (!query) {
        const res = await getCharacters(page.value, itemsPerPage.value)
        results.value = res.data
        console.log(res)
        totalPages.value = res.info.totalPages
      } else {
        const res = await getCharacterByName(query, page.value, itemsPerPage.value)
        results.value = res.data.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
        totalPages.value = res.info.totalPages
      }
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      loading.value = false
    }
  }

  const goToPage = async (newPage: number) => {
    await searchCharacters(newPage)
  }

  return {
    search,
    loading,
    results,
    page,
    totalPages,
    searchCharacters,
    goToPage,
  }
})
