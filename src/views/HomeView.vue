<template>
  <div class="home">
    <div class="home__grid">
      <CharacterCard
        v-for="character in characters"
        :key="character._id"
        :name="character.name"
        :image-url="character.imageUrl"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { results: characters } = storeToRefs(characterStore)
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
}
</style>
