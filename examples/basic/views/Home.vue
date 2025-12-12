<script setup>
import { ref } from 'vue';
import {
  EngageProvider,
  EngageElement,
  EngageElements,
} from '@poool/vue-engage';

const mode = ref('auto');

const switchMode = () => {
  mode.value = mode.value === 'auto' ? 'slug' : 'auto';
};
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Current mode : {{ mode }}</p>
    <button
      :style="{ marginBottom: '20px' }"
      @click="switchMode"
    >
      Switch to {{ mode === 'auto' ? 'slug' : 'auto' }} mode
    </button>

    <EngageProvider
      appId="155PF-L7Q6Q-EB2GG-04TF8"
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
