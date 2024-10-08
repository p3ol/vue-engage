<script>
import { ref } from 'vue'
import {
  EngageElement,
  EngageElements,
  EngageProvider,
} from '@poool/vue-engage';

export default {
  components: { EngageElement, EngageElements, EngageProvider },

  setup() {
    if (!document.referrer) {
      location.reload();
    }

    const mode = ref('auto')

    return { mode }
  },

  methods: {
    switchMode() {
      this.mode = this.mode === 'auto' ? 'slug' : 'auto';
    }
  }
}
</script>

<template>
  <EngageProvider
    appId="155PF-L7Q6Q-EB2GG-04TF8"
    :config="{ debug: true }"
    :vueDebug="true"
  >
    <p>Current mode : {{ this.mode }}</p>
    <button
      :style="{ marginBottom: '20px' }"
      @click="switchMode"
    >
      Switch to {{ this.mode === 'auto' ? 'slug' : 'auto' }} mode
    </button>

    <EngageElements v-if="this.mode === 'auto'" />
    <EngageElement v-else slug="react-engage" />
  </EngageProvider>
</template>