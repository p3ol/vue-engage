<template>
  <div>
    <h1>Article view {{ $route.params.id }}</h1>
    <router-link to="/">
      Back to home
    </router-link>
  </div>

  <EngageProvider
    appId="155PF-L7Q6Q-EB2GG-04TF8"
    :config="{ debug: true }"
    :vueDebug="true"
  >
    <EngageElements :key="route.fullPath" />
  </EngageProvider>
</template>

<script setup>
import { EngageElements, EngageProvider } from '@poool/vue-engage';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
