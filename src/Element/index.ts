import type { PropType, Ref } from 'vue';
import type { Poool } from 'poool-engage';
import { defineComponent, h, ref, toRaw, toRefs } from 'vue';

import type { EngageConfigCommons } from '../utils/types';
import { generateId } from '../utils';
import { trace, warn } from '../utils/logger';
import { EngageProviderSymbol, EngageProviderValue } from '../EngageProvider';

export declare interface ElementProps extends Omit<
  EngageConfigCommons, 'appId'
> {
  /**
   * The element unique id
   */
  id: String;
  /**
   * The element unique slug
   */
  slug: String;
  /**
   * Whether to use global engage lib factory
   */
  useGlobalFactory?: Boolean;
  /**
   * Additional custom props
   */
  rest?: Object
}

export declare interface ElementRef extends ElementProps {
  containerRef: Ref<HTMLElement>;
  elementRef: Ref<Poool.EngageElement>;
  elementId: string;
  engage: Poool.Engage | null;
  destroy: () => void;
}

const Element = defineComponent({
  name: 'ElementComponent',

  props: {
    id: String as PropType<ElementProps['id']>,
    slug: String as PropType<ElementProps['slug']>,
    config: Object as PropType<ElementProps['config']>,
    texts: Object as PropType<ElementProps['texts']>,
    variables: Object as PropType<ElementProps['variables']>,
    events: Object as PropType<ElementProps['events']>,

    useGlobalFactory: {
      type: Boolean as PropType<ElementProps['useGlobalFactory']>,
      default: true,
    },

    rest: Object as PropType<ElementProps['rest']>,
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
      engageFactory: null as Poool.Engage,
      mounted: {
        type: Boolean,
        default: false,
      },
    }
  },

  setup(props) {
    const containerRef = ref<HTMLElement>();
    const elementRef = ref<Poool.EngageElement>();
    const componentId = props.id || generateId();

    return { containerRef, elementRef, componentId };
  },

  mounted() {
    this.create();
  },

  beforeUnmount() {
    const container = this.$refs.containerRef as HTMLElement;
    this.mounted = false;
    this.destroy(container);
  },

  methods: {
    async create() {
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
      this.elementRef.current = element;

      if (!this.mounted) {
        this.destroy();
      }
    },

    destroy() {
      this.elementRef.current?.destroy();
    }
  },

  render() {
    return h(
      this.tag ?? 'div',
      {
        id: this.componentId,
        ref: 'containerRef',
        ...toRefs(this.rest),
      },
      this.$slots?.default?.()
    );
  },

});

export default Element;