<template>
  <div class="home">
    <div v-if="loading" class="home__loading">
      <div class="spinner"></div>
    </div>

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
        />
      </div>
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { results: characters, loading } = storeToRefs(characterStore)
</script>



<style lang="scss" scoped>
.home {
  padding: 2rem;

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  &__loading,
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


.spinner {
  width: 60px;
  height: 60px;
  background-color: #ffeb3b;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
  box-shadow: 0 0 0 5px #ff69b4;
}

@keyframes bounce {
  to {
    transform: translateY(-30px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}
</style>
