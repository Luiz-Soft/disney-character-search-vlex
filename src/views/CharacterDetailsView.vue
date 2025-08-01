<template>
  <div v-if="hasError" class="character-details__error" @click="fetchCharacter">
    {{ $t('characterDetails.errorRetry') }}
  </div>

  <div class="character-details" v-else-if="character">
    <h1 class="character-details__title">{{ character.data.name }}</h1>

    <img
      :src="character.data.imageUrl"
      :alt="character.data.name"
      class="character-details__image"
      @error="imageError = true"
    />
    <div v-if="imageError" class="character-details__fallback">🧚</div>

    <div class="character-details__section" v-if="character.data.films?.length">
      <h2>{{ $t('characterDetails.films') }}</h2>
      <ul>
        <li v-for="film in character.data.films" :key="film">{{ film }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.shortFilms?.length">
      <h2>{{ $t('characterDetails.shortFilms') }}</h2>
      <ul>
        <li v-for="short in character.data.shortFilms" :key="short">{{ short }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.tvShows?.length">
      <h2>{{ $t('characterDetails.tvShows') }}</h2>
      <ul>
        <li v-for="show in character.data.tvShows" :key="show">{{ show }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.videoGames?.length">
      <h2>{{ $t('characterDetails.videoGames') }}</h2>
      <ul>
        <li v-for="game in character.data.videoGames" :key="game">{{ game }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.parkAttractions?.length">
      <h2>{{ $t('characterDetails.parkAttractions') }}</h2>
      <ul>
        <li v-for="attraction in character.data.parkAttractions" :key="attraction">{{ attraction }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.allies?.length">
      <h2>{{ $t('characterDetails.allies') }}</h2>
      <ul>
        <li v-for="ally in character.data.allies" :key="ally">{{ ally }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.enemies?.length">
      <h2>{{ $t('characterDetails.enemies') }}</h2>
      <ul>
        <li v-for="enemy in character.data.enemies" :key="enemy">{{ enemy }}</li>
      </ul>
    </div>
  </div>

  <div v-else class="character-details__loading">
    <LoadingSpinner v-if="loading" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type Character, getCharacterById } from '@/services/charactersService'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const character = ref<Character | null>(null)
const imageError = ref(false)
const hasError = ref(false)
const loading = ref(true)

const fetchCharacter = async () => {
  const id = String(route.params.id)
  hasError.value = false
  character.value = null
  loading.value = true

  try {
    character.value = await getCharacterById(id)
  } catch (err) {
    console.error('Error loading character:', err)
    hasError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchCharacter)
</script>

<style lang="scss" scoped>
.character-details {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff8dc;
  border: 4px dashed #ff69b4;
  border-radius: 20px;
  text-align: center;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #4a148c;
  }

  &__image {
    width: 300px;
    height: auto;
    border-radius: 12px;
    border: 3px solid #ffd700;
    margin-bottom: 1rem;
  }

  &__fallback {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  &__section {
    max-width: 500px;
    margin: 2rem auto;
    text-align: center;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      color: #d81b60;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 0.3rem 0;
        font-size: 1.1rem;
      }
    }

    hr {
      margin-top: 1.5rem;
      border: none;
      height: 2px;
      background-color: #ffb6c1;
      border-radius: 4px;
      width: 60%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__loading,
  &__error {
    text-align: center;
    padding: 4rem;
    font-size: 1.5rem;
    color: #ff69b4;
    cursor: pointer;
  }

  &__error:hover {
    text-decoration: underline;
  }
}
</style>
