<template>
  <div class="home">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="characters.length === 0" class="home__empty">
      <p>{{ $t('emptyContent') }}</p>
    </div>

    <div v-else>
      <div class="home__grid">
        <CharacterCard
          v-for="character in characters"
          :key="character._id"
          :name="character.name"
          :image-url="character.imageUrl"
          @click="goToDetails(character._id)"
        />
      </div>
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const characterStore = useCharacterStore()
const { results: characters, loading } = storeToRefs(characterStore)

const router = useRouter()
const goToDetails = (id: number) => {
  router.push({ name: 'CharacterDetails', params: { id } })
}
</script>

<style scoped lang="scss">
.home {
  padding: 2rem;

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff69b4;
    font-family: 'Comic Sans MS', 'Baloo 2', cursive;
    text-shadow: 1px 1px #fff;
  }
}
</style>
