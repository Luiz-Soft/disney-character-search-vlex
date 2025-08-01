<template>
  <div class="character-card">
    <img :src="imageUrl" :alt="name" class="character-card__image" />
    <h2 class="character-card__name">{{ name }}</h2>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
  imageUrl: string
}>()
</script>

<style lang="scss" scoped>
.character-card {
  background-color: #fff8dc;
  border: 3px solid #ffd700;
  border-radius: 20px;
  box-shadow: 4px 4px 0 #ff69b4;
  padding: 1rem;
  text-align: center;
  width: 200px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 6px 6px 0 #ff69b4;
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #ffeb3b;
    margin-bottom: 0.75rem;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4a148c;
    text-shadow: 1px 1px #ffd700;
    margin: 0;
  }
}
</style>
