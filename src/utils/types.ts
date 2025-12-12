import type { Poool } from 'poool-engage';

export declare type EventCallbackFunction<Props> = (props: Props) => any;
export declare type EventCallbackObject<Props> = {
  once: true;
  callback: EventCallbackFunction<Props>;
};

export declare type EventCallback<Props> =
  | EventCallbackFunction<Props>
  | EventCallbackObject<Props>;

export declare type BaseEvents = {
  [key in Poool.EngageEventsList]?: any
};

export declare interface EngageEvents extends BaseEvents {
  /**
   * Triggered when the element is fully loaded and displayed inside the page.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#ready
   */
  ready?: EventCallback<{
    element: {
      [fieldKey: string]: any;
    };
  }>;
  /**
   * Triggered when the element has been seen by the user (when it has
   * entered the browser's viewport).
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#seen
   */
  seen?: EventCallback<{
    element: {
      [fieldKey: string]: any;
    };
  }>;
  /**
   * Triggered when a user has clicked a button/link inside the element.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#click
   */
  click?: EventCallback<{
    id: string;
    type: string;
    originalEvent: MouseEvent;
    url: string;
    name: string;
    element: {
      [fieldKey: string]: any;
    };
  }>;
  /**
   * Triggered when a user submits a form inside an element.
   *
   * For example, thanks to this event, you'll be able to save a user's
   * provided informations using tools such as a DMP.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#formSubmit
   */
  formSubmit?: EventCallback<{
    fields: {
      [fieldKey: string]: any;
    };
    valid: {
      [fieldKey: string]: boolean;
    };
    element: {
      [fieldKey: string]: any;
    };
  }>;
}

export declare interface EngageConfigCommons {
  /**
   * Current app ID.
   */
  appId?: string;
  /**
   * Current Engage context config.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/configuration
   */
  config?: Poool.EngageConfigOptions;
  /**
   * Current Engage context variables.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/variables
   */
  variables?: { [key: string]: any };
  /**
   * Current Engage context texts.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/texts
   */
  texts?: { [key: string]: string };
  /**
   * Current Engage context events listeners.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events
   */
  events?: { [key in Poool.EngageEventsList]?: EngageEvents[key] };
}
