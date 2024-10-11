# Poool Engage - Vue SDK

Plugin to easily add Poool engage to your Vue app ✨

## Installation

```bash
yarn add @poool/vue-engage
```

## Usage

```html
<script>
  import { ref } from 'vue';
  import {
    EngageElement,
    EngageElements,
    EngageProvider,
  } from '@poool/vue-engage';
</script>

<template>
  <!-- Wrap everything with our EngageProvider component -->
  <EngageProvider
    appId="insert_your_app_id"
    :config="{ debug: true }"
  >
    <!--
      Use our EngageElements component where you want if you want to auto create
      & display every elements matching your site & config conditions
    -->
    <EngageElements />

    <!-- Use our EngageElement component where you want it to be displayed -->
    <EngageElement slug="my-element-slug" />
  </EngageProvider>
</template>
```

## Documentation

### `<EngageProvider />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Engage config (see the [configuration](https://poool.dev/fr/docs/engage/javascript/configuration)).
- `texts` {`Object`} (optional) Engage texts (see the [texts](https://poool.dev/fr/docs/engage/javascript/texts) documentation).
- `variables` {`Object`} (optional) Engage variables (see the [variables](https://poool.dev/fr/docs/engage/javascript/variables) documentation).
- `events` {`Object`} (optional) Engage events listeners (see the [events](https://poool.dev/fr/docs/engage/javascript/events) documentation).
- `scriptUrl` {`String`} (optional, default: `'https://assets.poool.fr/engage.min.js'`) Default Poool Engage SDK url
- `scriptLoadTimeout` {`Number`} (optional, default: `2000`) Timeout for the script to load
- `vueDebug` {`Boolean`} (optional, default: `false`) Whether to enable vue-engage debug or not

### Inject providers

To use EngageProvider values in one of your child component,
use inject method from vue.

#### Composition API

```html
<script>
  import { inject } from 'vue';
  import { EngageProviderSymbol } from '@poool/vue-engage';

  const engageProvider = inject(EngageProviderSymbol);

  const {
    lib: engage, // Engage sdk instance
    appId,
    config,
    // every other props like texts and so on..

    // global engage factory created in the provider
    factory,

    // create a new factory to replace the global created one
    createFactory,

    // Increment the page view counter in the browser's localStorage for elements with a page view count limit.
    commitPageView,
  } = engageProvider;

  // Example:
  const previousSession = localStorage.getItem('session');
  const newSession = Date.now();

  if (newSession - previousSession > 1800000) {
    commitPageView();
    localStorage.setItem('session', newSession);
  }
</script>
```

#### Options API

```js
import { defineComponent, inject } from 'vue';
import { EngageProviderSymbol } from '@poool/vue-engage';

const MyChildComponent = defineComponent({
  name: 'MyChildComponent',
  inject: {
    engageProvier: { from: EngageProviderSymbol },
  },
  // You can also use watch if you want
  /* 
    Note that deep: true is needed for reactive injected values & objects
  */
  watch: {
    engageProvier: { handler: 'myMethod', deep: true  },
  },
  methods: {
    myMethod() {
      // Engage provider values
      const { config } = this.engageProvider; 
    },
  },
});

export default MyChildComponent;
```

### `<EngageElements />`

Creates all elements matching multiple conditions like device, country, custom filters, etc.

#### Props

- `config` {`Object`} (optional) Engage config (see the [configuration](https://poool.dev/docs/engage/javascript/configuration) documentation).
- `texts` {`Object`} (optional) Engage texts (see the [texts](https://poool.dev/docs/engage/javascript/texts) documentation).
- `variables` {`Object`} (optional) Engage variables (see the [variables](https://poool.dev/docs/engage/javascript/variables) documentation).
- `events` {`Object`} (optional) Engage events listeners (see the [events](https://poool.dev/docs/engage/javascript/events) documentation)
- `filters` {`Array<String>`} (optional) Engage conditions to filter every elements to display
- `useGlobalFactory` {`Boolean`} (optional, default: `true`) Whether to use global factory, created in the EngageProvider component


### `<EngageElement />`

#### Props

- `tag` {`String | Object`} (optional, default: `div`) Element's wrapper custom tag
- `id` {`String`} (optional, default: custom generated string) A custom id to forward to the html element
- `slug` {`String`} (optional) Slug of the element you want to display
- `config` {`Object`} (optional) Engage config (see the [configuration](https://poool.dev/docs/engage/javascript/configuration) documentation).
- `texts` {`Object`} (optional) Engage texts (see the [texts](https://poool.dev/docs/engage/javascript/texts) documentation).
- `variables` {`Object`} (optional) Engage variables (see the [variables](https://poool.dev/docs/engage/javascript/variables) documentation).
- `events` {`Object`} (optional) Engage events listeners (see the [events](https://poool.dev/docs/engage/javascript/events) documentation)
- `useGlobalFactory` {`Boolean`} (optional, default: `true`) Whether to use global factory, created in the EngageProvider component

 
### Quickly test localy

Run basic example with Vite

```bash
yarn example:basic
```

Run Nuxt framework example

```bash
yarn example:nuxt
```
