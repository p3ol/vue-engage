import type { Component, PropType, Ref } from 'vue';
import type { Poool } from 'poool-engage';
import { defineComponent, h, ref, toRaw } from 'vue';

import type { EngageConfigCommons } from '../utils/types';
import { generateId } from '../utils';
import { trace, warn } from '../utils/logger';
import { EngageProviderSymbol, EngageProviderValue } from '../EngageProvider';

export declare interface EngageElementProps extends Omit<
  EngageConfigCommons, 'appId'
> {
  /**
   * The element Tag
   */
  tag?: string | Component;
  /**
   * The element unique id
   */
  id: string;
  /**
   * The element unique slug
   */
  slug: string;
  /**
   * Whether to use global engage lib factory
   */
  useGlobalFactory?: boolean;
  /**
   * Additional custom props
   */
  [key: string]: any;
}

export declare interface EngageElementRef extends EngageElementProps {
  containerRef: Ref<HTMLElement>;
  elementRef: Ref<Poool.EngageElement>;
  elementId: string;
  engage: Poool.Engage | null;
  destroy: () => void;
}

const Element = defineComponent({
  name: 'EngageElement',
  inject: {
    // Use Engage Provider to get the Engage SDK and its config
    engageProvider: { from: EngageProviderSymbol },
  },
  props: {
    tag: {
      type: [String, Object] as PropType<EngageElementProps['tag']>,
      default: 'div',
    },
    id: {
      type: String as PropType<EngageElementProps['id']>,
      default: '',
    },
    slug: {
      type: String as PropType<EngageElementProps['slug']>,
      default: '',
    },
    config: {
      type: Object as PropType<EngageElementProps['config']>,
      default: () => ({}),
    },
    texts: {
      type: Object as PropType<EngageElementProps['texts']>,
      default: () => ({}),
    },
    variables: {
      type: Object as PropType<EngageElementProps['variables']>,
      default: () => ({}),
    },
    events: {
      type: Object as PropType<EngageElementProps['events']>,
      default: () => ({}),
    },
    useGlobalFactory: {
      type: Boolean as PropType<EngageElementProps['useGlobalFactory']>,
      default: true,
    },
  },
  setup (props) {
    const containerRef = ref<HTMLElement>();
    const elementRef = ref<Poool.EngageElement>({} as Poool.EngageElement);
    const componentId = props.id || generateId();

    return { containerRef, elementRef, componentId };
  },
  data () {
    return {
      engageFactory: null as Poool.Engage,
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
    const container = this.$refs.containerRef as HTMLElement;
    this.mounted = false;
    this.destroy(container);
  },
  methods: {
    async create () {
      this.mounted = true;

      const {
        createFactory,
        factory: globalFactory,
        vueDebug,
      } = this.engageProvider as EngageProviderValue;

      trace('Element', vueDebug, 'Trying to create an element..');

      const {
        containerRef,
        config,
        events,
        slug,
        texts,
        useGlobalFactory,
        variables,
      } = this;

      // Use EngageProvider global factory when needed or create a new one
      // for each element
      const factory = useGlobalFactory ? globalFactory : createFactory?.({
        config,
        events,
        texts,
        variables,
      });

      const engage = toRaw(factory);

      if (!engage) {
        warn(
          'Element',
          vueDebug,
          `Engage SDK is not loaded yet ${useGlobalFactory
            ? 'through EngageProvider'
            : ''
          }`
        );

        return;
      }

      const element = await engage.createElement(slug, containerRef);
      this.elementRef.value = element;

      if (!this.mounted) {
        this.destroy();
      }
    },
    destroy () {
      toRaw(this.elementRef?.value)?.destroy();
    },
  },
  render () {
    return h(
      this.tag ?? 'div',
      {
        id: this.componentId,
        ref: 'containerRef',
      },
      this.$slots?.default?.()
    );
  },
});

export default Element;
