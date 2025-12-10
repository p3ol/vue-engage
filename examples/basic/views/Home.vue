<script setup>
import { ref } from 'vue';

import {
  EngageProvider,
  EngageElement,
  EngageElements,
} from '@poool/vue-engage';

const mode = ref('auto')

const switchMode = () => {
  mode.value = mode.value === 'auto' ? 'slug' : 'auto';
}
</script>

<template>
  <div>
    <h1>Page d'accueil</h1>
    <p>Current mode : {{ mode }}</p>
    <button
      :style="{ marginBottom: '20px' }"
      @click="switchMode"
    >
      Switch to {{ mode === 'auto' ? 'slug' : 'auto' }} mode
    </button>

    <EngageProvider
      appId="Qz9V02LNSO78aGfJEuAKNGTNmC8vbzmW6nEW8USQjlQGUcWbmWCtIT31mpWbVEG0"
      :config="{ debug: true }"
      :vueDebug="true"
      :events="{
        ready: () => { console.log('Engage element is ready'); },
      }"
    >
      <EngageElements v-if="mode === 'auto'" />
      <EngageElement v-else slug="react-engage" />
    </EngageProvider>
  </div>
</template>
