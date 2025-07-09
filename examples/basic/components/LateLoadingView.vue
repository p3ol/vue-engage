<script>
import { nextTick } from 'vue'
import { EngageElements } from '@poool/vue-engage';

export default {
  components: { EngageElements },

  data() {
    return {
      isUpdated: false,
      key: 0,
      mode: 'auto',
    }
  },

  mounted() {
    setTimeout(async() => {
      this.isUpdated = true;
      await nextTick();
      this.key += 1;
    }, 3000);
  },
}
</script>

<template>
  <p>Current mode : {{ this.mode }}</p>
  <router-link to="/">Home</router-link>
  <br />
  <router-link to="/article/1">Go to article 1</router-link>

  <EngageElements :key="isUpdated" />

  <div class="element" v-if="isUpdated" />
</template>