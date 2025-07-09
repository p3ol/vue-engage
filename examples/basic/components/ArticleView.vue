<script>
import { EngageElements } from '@poool/vue-engage';
import { useRoute } from 'vue-router';

export default {
  components: { EngageElements },

  setup() {
    const route = useRoute();
    const articleId = route.params.id;
    return { articleId };
  },

  watch: {
    '$route.params.id'(newId) {
      this.articleId = newId;
    }
  }
}
</script>

<template>
  <router-link to="/">Home</router-link>
  <br />
  <router-link :to="`/article/${articleId === '1' ? '2' : '1'}`">
    Go to Article {{ articleId === '1' ? '2' : '1' }}
  </router-link>

  <EngageElements :key="articleId" />

  <div class="element" v-if="articleId === '2'" />
</template>