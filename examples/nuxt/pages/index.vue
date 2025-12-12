<script setup>
import { ref } from 'vue';
import {
  EngageElement,
  EngageElements,
  EngageProvider,
} from '@poool/vue-engage';

let mode = ref('auto');

const switchMode = () => {
  mode.value = mode.value === 'auto' ? 'slug' : 'auto';
};
</script>

<template>
  <EngageProvider
    appId="155PF-L7Q6Q-EB2GG-04TF8"
    :config="{ debug: true }"
    :vueDebug="true"
  >
    <p>Current mode : {{ mode }}</p>
    <button
      :style="{ marginBottom: '20px' }"
      @click="switchMode"
    >
      Switch to {{ mode === 'auto' ? 'slug' : 'auto' }} mode
    </button>

    <EngageElements v-if="mode === 'auto'" />
    <EngageElement v-else slug="react-engage" />

    <div id="app" /> <!-- This is only for engage element dislay -->
  </EngageProvider>
</template>
