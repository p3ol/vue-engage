<template>
  <div>
    <h1>Article view {{ $route.params.id }}</h1>
    <p>Cette page contient des informations sur l'application.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>

  <EngageProvider
    appId="Qz9V02LNSO78aGfJEuAKNGTNmC8vbzmW6nEW8USQjlQGUcWbmWCtIT31mpWbVEG0"
    :config="{ debug: true }"
    :vueDebug="true"
    >
    <EngageElements :key="route.fullPath"/>
  </EngageProvider>
</template>

<script setup>
import { EngageElements, EngageProvider } from '@poool/vue-engage';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
