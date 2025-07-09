<script setup>
import { EngageProvider } from '@poool/vue-engage';
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
    <EngageProvider
      appId="155PF-L7Q6Q-EB2GG-04TF8"
      :config="{ debug: true }"
      :vueDebug="true"
    >
      <RouterView />
    </EngageProvider>
  </main>
</template>

<style>
nav {
  margin-top: 1rem;
}

.ml-3 {
  margin-left: 1rem;
}

.mt-3 {
  margin-top: 1rem;
}
</style>