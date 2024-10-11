export const randomString = () =>
  Math.random().toString(36).slice(2, 7);

export const generateId = () => {
  let id;

  while (!id) {
    const temp = `poool-${randomString()}-${randomString()}`;

    if (typeof document === 'undefined' || !document.getElementById?.(temp)) {
      id = temp;
    }
  }

  return id;
};

export const loadScript = (
  url: string,
  id: string,
  opts: { timeout?: number } = {}
) => new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === 'test') {
    return resolve(true);
  }

  const existing = globalThis.document.getElementById(id);

  if (existing) {
    return Promise.race([
      new Promise(resolve => existing.addEventListener('load', resolve)),
      new Promise(resolve => setTimeout(resolve, opts.timeout ?? 2000)),
    ]);
  }

  const script = globalThis.document.createElement('script');
  script.onload = resolve;
  script.onerror = reject;
  script.async = true;
  script.src = url;
  script.id = id;
  globalThis.document.head.appendChild(script);
});

export const getGlobal = () => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;

  return globalThis;
};
export const isOldIE = () => {
  const ua = getGlobal()?.navigator.userAgent ?? '';

  if (ua.indexOf('Trident/') > 0) {
    const rv = ua.indexOf('rv:');

    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10) <= 11;
  }

  return false;
};

export const isMobile = () => {
  return /Mobi/i
    .test(navigator.userAgent || navigator.vendor);
};