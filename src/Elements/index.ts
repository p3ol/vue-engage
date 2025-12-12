import type { PropType, Ref } from 'vue';
import type { Poool } from 'poool-engage';
import { defineComponent, ref, toRaw } from 'vue';

import type { EngageConfigCommons } from '../utils/types';
import { trace, warn } from '../utils/logger';
import { EngageProviderSymbol, EngageProviderValue } from '../EngageProvider';

export declare interface EngageElementsProps extends Omit<
  EngageConfigCommons, 'appId'
> {
  /**
   * Whether to use global engage lib factory
   */
  useGlobalFactory?: boolean;
  /**
   * List of filters to apply to elements
   */
  filters?: string[];
}

export declare interface EngageElementsRef extends EngageElementsProps {
  elementsRef: Ref<Poool.EngageElement[]>;
  engage: Poool.Engage | null;
  destroy: Promise<void[]>;
}

const Elements = defineComponent({
  name: 'ElementsComponent',
  inject: {
    // Use Engage Provider to get the Engage SDK and its config
    engageProvider: { from: EngageProviderSymbol },
  },
  props: {
    config: {
      type: Object as PropType<EngageElementsProps['config']>,
      default: () => ({}),
    },
    texts: {
      type: Object as PropType<EngageElementsProps['texts']>,
      default: () => ({}),
    },
    variables: {
      type: Object as PropType<EngageElementsProps['variables']>,
      default: () => ({}),
    },
    events: {
      type: Object as PropType<EngageElementsProps['events']>,
      default: () => ({}),
    },
    filters: {
      type: Array as PropType<EngageElementsProps['filters']>,
      default: () => ([]),
    },
    useGlobalFactory: {
      type: Boolean as PropType<EngageElementsProps['useGlobalFactory']>,
      default: true,
    },
  },
  setup () {
    const elementsRef = ref<Poool.EngageElement[]>([]);

    return { elementsRef };
  },
  data () {
    return {
      mounted: {
        type: Boolean,
        default: false,
      },
    };
  },
  watch: {
    'engageProvider.lib': { handler: 'create', deep: true },
  },
  mounted () {
    this.create();
  },
  beforeUnmount () {
    this.mounted = false;
    this.destroy();
  },
  methods: {
    async create () {
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
    async destroy () {
      return await Promise.all((this.elementsRef.value || [])
        .map((elem: Poool.EngageElement) => toRaw(elem)?.destroy())
      );
    },
  },
  render () {
    return this.$slots?.default?.();
  },
});

export default Elements;
