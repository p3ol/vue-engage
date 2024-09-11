/* eslint-disable no-console */
import { isMobile, isOldIE } from './';

const styles: Record<string, any> = {
  default: {
    'background-color': '#807BFC',
    color: '#FFF',
    'font-weight': 'bold',
  },
  warn: {
    'background-color': '#B2974B',
  },
  error: {
    'background-color': '#ee7674',
  },
};

const getStyles = (component: string, type?: 'warn' | 'error') => {
  let _styles = { ...styles.default };

  if (type) {
    _styles = {
      ..._styles,
      ...styles[type],
    };
  }

  return Object.entries(_styles).map(([k, v]) => `${k}: ${v};`).join(' ');
};

export const trace = (
  component: string = 'EngageProvider',
  debugEnabled: boolean = false,
  ...args: any[]
) => {
  if (!debugEnabled || !console) { return; }

  if (isMobile() || isOldIE()) {
    console.log('[Vue-Engage] ' + component + ' :', ...args);
  } else {
    console.log(`[Vue-Engage] %c ${component} `, getStyles(component), ...args);
  }
};

export const warn = (
  component: string = 'EngageProvider',
  debugEnabled: boolean = false,
  ...args: any[]
) => {
  if (!debugEnabled || !console) { return; }

  if (isMobile() || isOldIE()) {
    console.warn('[Vue-Engage Debug] ' + component + ' :', ...args);
  } else {
    console.warn(`[Vue-Engage] %c ${component} `, getStyles(component, 'warn'), ...args);
  }
};

export const error = (
  component: string = 'EngageProvider',
  debugEnabled: boolean = false,
  ...args: any[]
) => {
  if (!debugEnabled || !console) { return; }

  if (isMobile() || isOldIE()) {
    console.error('[Vue-Engage Debug] ' + component + ' :', ...args);
  } else {
    console.error(`[Vue-Engage] %c ${component} `, getStyles(component, 'error'), ...args);
  }
};
