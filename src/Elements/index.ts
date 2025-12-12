import type { PropType, Ref } from 'vue';
import { defineComponent, ref, toRaw } from 'vue';
import type { Poool } from 'poool-engage';

import type { EngageConfigCommons } from '../utils/types';
import { trace, warn } from '../utils/logger';
import { EngageProviderSymbol, EngageProviderValue } from '../EngageProvider';

export declare interface EngageElementsProps extends Omit<
  EngageConfigCommons, 'appId'
> {
  /**
   * Whether to use global engage lib factory
   */
  useGlobalFactory?: Boolean;
  /**
   * List of filters to apply to elements
   */
  filters?: String[]
}

export declare interface EngageElementsRef extends EngageElementsProps {
  elementsRef: Ref<Poool.EngageElement[]>;
  engage: Poool.Engage | null;
  destroy: Promise<void[]>;
}

const Elements = defineComponent({
  name: 'ElementsComponent',

  props: {
    config: Object as PropType<EngageElementsProps['config']>,
    texts: Object as PropType<EngageElementsProps['texts']>,
    variables: Object as PropType<EngageElementsProps['variables']>,
    events: Object as PropType<EngageElementsProps['events']>,
    filters: Object as PropType<EngageElementsProps['filters']>,

    useGlobalFactory: {
      type: Boolean as PropType<EngageElementsProps['useGlobalFactory']>,
      default: true,
    },
  },

  inject: {
    // Use Engage Provider to get the Engage SDK and its config
    engageProvider: { from: EngageProviderSymbol },
  },

  watch: {
    'engageProvider.lib': { handler: 'create', deep: true },
  },

  data() {
    return {
      mounted: {
        type: Boolean,
        default: false,
      },
    }
  },

  setup() {
    const elementsRef = ref<Poool.EngageElement[]>([]);

    return { elementsRef };
  },

  mounted() {
    this.create();
  },

  beforeUnmount() {
    this.mounted = false;
    this.destroy();
  },

  methods: {
    async create() {
      this.mounted = true;

      const {
        createFactory,
        factory: globalFactory,
        vueDebug,
      } = this.engageProvider as EngageProviderValue;

      trace('Elements', vueDebug, 'Trying to auto create elements..');

      const {
        config,
        events,
        filters,
        texts,
        useGlobalFactory,
        variables,
      } = this;

      const factory = useGlobalFactory ? globalFactory : createFactory?.({
        config,
        events,
        texts,
        variables,
      });

      const engage = toRaw(factory);
      if (!engage) {
        warn(
          'Elements',
          vueDebug,
          `Engage SDK is not loaded yet ${useGlobalFactory
            ? 'through EngageProvider'
            : ''
          }`
        );
        return;
      }

      const elements = await engage.autoCreate({ filters });
      this.elementsRef.value = elements;

      if (!this.mounted) {
        this.destroy();
      }
    },

    async destroy() {
      return await Promise.all((this.elementsRef.value || [])
        .map((elem: Poool.EngageElement) => toRaw(elem)?.destroy())
      );
    }
  },

  render() {
    return this.$slots?.default?.()
  },

});

export default Elements;