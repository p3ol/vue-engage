import {
  type PropType,
  computed,
  defineComponent,
  readonly,
  toRaw,
  } from 'vue';
import type { Poool } from 'poool-engage';
import { mergeDeep } from '@junipero/core';

import type {
  EngageConfigCommons,
  EventCallback,
  EventCallbackFunction,
  EventCallbackObject,
} from '../utils/types';
import { loadScript } from '../utils';
import { trace, warn } from '../utils/logger';

export declare interface EngageProviderValue extends Omit<
  EngageConfigCommons, 'appId'
> {
  /**
   * The global factory instance, generated from this provider
   */
  factory?: Poool.Engage,
  /**
   * Function to trigger a new engage init, returns the created engage instance,
   * with passed options
   *
   * More infos: https://www.poool.dev/docs/engage/vue
   */
  createFactory: (opts?: Omit<EngageConfigCommons, 'appId'>) => Poool.Engage;
  /**
   * Function to commit a new pageview
   *
   * More infos: https://www.poool.dev/docs/engage/vue
   */
  commitPageView: () => void;
  /**
   * Whether to enable the vue debug
   */
  vueDebug: boolean;
}

// We use symbols as unique identifiers.
export const EngageProviderSymbol = Symbol('EngageProvider');

const EngageProvider = defineComponent({
  name: 'EngageProvider',

  props: {
    appId: String,

    config: {
      type: Object as PropType<EngageProviderValue['config']>,
      default() { return {}; },
    },

    texts: {
      type: Object as PropType<EngageProviderValue['texts']>,
      default() { return {}; },
    },

    variables: {
      type: Object as PropType<EngageProviderValue['variables']>,
      default() { return {}; },
    },

    events: {
      type: Object as PropType<EngageProviderValue['events']>,
      default() { return {}; },
    },

    scriptUrl: {
      type: String,
      default: 'https://assets.poool.fr/engage.min.js',
    },

    scriptLoadTimeout: {
      type: Number,
      default: 2000,
    },

    vueDebug: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      lib: null as Poool.Engage | null,
      factory: null as Poool.Engage,
    };
  },

  async mounted() {
    if (
      !globalThis.Engage &&
      !globalThis.Engage?.isPoool &&
      !globalThis.PooolEngage &&
      !globalThis.PooolEngage?.isPoool
    ) {
      await loadScript(this.scriptUrl, 'poool-vue-engage-lib', {
        timeout: this.scriptLoadTimeout,
      });
    }

    this.init();
  },

  methods: {
    // Method to load the Engage SDK script into the global scope
    async init() {
      const engageRef = globalThis.PooolEngage || globalThis.Engage;
      this.lib = engageRef?.noConflict();

      if (!this.lib) { return; }

      const { lib, config, variables, texts, events } = this;

      const factory = this.createFactory({
        config,
        events,
        texts,
        variables,
      }, lib) as Poool.Engage;

      this.factory = factory;
    },

    // Method to create a new Engage factory instance with every configs &
    // event handlers
    createFactory(opts: Omit<EngageConfigCommons, 'appId'> = {}) {
      const lib = toRaw(this.lib);

      if (!lib) {
        warn('EngageProvider', this.vueDebug, 'Engage SDK is not loaded yet');

        return;
      }

      const config = mergeDeep({}, this.config, opts.config);
      const texts = mergeDeep({}, this.texts, opts.texts);
      const variables = mergeDeep({}, this.variables, opts.variables);
      const events = mergeDeep(
        {}, this.events, opts.events
      ) as EngageProviderValue['events'];

      trace('EngageProvider', this.vueDebug, 'Creating Engage instance with :',
        { config, texts, variables, events }
      );

      const factory = lib.init(this.appId as string)
        .config(config)
        .texts(texts)
        .variables(variables);

      Object
        .entries((events || {}))
        .concat(Object.entries((opts.events || {})))
        .forEach(([
          event,
          callback,
        ]: [
          string,
          EventCallback<typeof this.events[keyof typeof this.events]>,
        ]) => {
          const eventName = event as Poool.EngageEventsList;
          if ((callback as EventCallbackObject<typeof event>).once) {
            factory.once(eventName,
              (callback as EventCallbackObject<typeof event>).callback);
          } else {
            factory.on(
              eventName,
              callback as EventCallbackFunction<typeof event>
            );
          }
        });

      trace('EngageProvider', this.vueDebug,
        'Engage factory initialized & setup successfuly'
      );

      return factory;
    },

    commitPageView() {
      const engage = toRaw(this.lib) as Poool.Engage;

      if (!engage) { return; }

      engage.commitPageView();
    }
  },

  // Used to provide the EngageProvider values to all child components
  provide() {
    return {
      [EngageProviderSymbol]: readonly({
        lib: computed(() => this.lib),
        appId: computed(() => this.appId),
        config: computed(() => this.config),
        texts: computed(() => this.texts),
        variables: computed(() => this.variables),
        events: computed(() => this.events),
        scriptUrl: computed(() => this.scriptUrl),
        vueDebug: computed(() => this.vueDebug),
        factory: computed(() => this.factory),
        createFactory: this.createFactory,
        commitPageView: this.commitPageView,
      }) as EngageProviderValue,
    }
  },

  render() {
    // Our provider component is a renderless component
    // it does not render any markup of its own.
    return this.$slots?.default?.();
  },
});

export default EngageProvider;
