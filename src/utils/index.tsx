import { useState, useEffect, useRef } from 'react';

export default function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect(); };
  }, []);

  return isIntersecting;
}

export function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer)
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDidMountEffect(func: Function, deps: any) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}



export const PROD_URI = 'https://prod-api.coolcatsnft.com/';
export const DEV_URI = 'https://sandbox-api.coolcatsnft.com/';
export const MOCK_URI = 'https://private-b23b4-coolcatsapi.apiary-mock.com/';

export const getApiUri = function() {
  if (isLive()) {
    return PROD_URI;
  } else if (isTest()) {
    return DEV_URI;
  } else if (isDev()) {
    return DEV_URI;
  }

  throw new Error('Unable to determine API uri');
}

export const isLive = function() {
  const LIVESITES = ['www.coolcatsnft.com', 'coolcatsnft.com', 'prod.coolcatsnft.com'];
  return (LIVESITES.indexOf(window.location.hostname) >= 0);
}

export const isTest = function() {
  const TESTSITES = ['dev.coolcatsnft.com', 'main.d3oeaxk2zrzxga.amplifyapp.com'];
  return (TESTSITES.indexOf(window.location.hostname) >= 0);
}

export const isDev = function() {
  const DEVSITES = ['localhost'];
  return (DEVSITES.indexOf(window.location.hostname) >= 0);
}

const LIVE_API_PATHS = [] as any;

const DEV_API_PATHS = [
  'cat',
  'nonce',
  'login',
  'logout',
  'auth/user-property',
  /auth\/user-property\/([A-z]+)/,
  /cat\/([0-9]+)/
];

export const isLivePath = function(path: string) {
  return _isPath(LIVE_API_PATHS, path);
};

export const isDevPath = function(path: string) {
  return _isPath(DEV_API_PATHS, path);
};

export const _isPath = function(paths: any[], path: string) {
  return paths.filter((p) => {
    if (typeof p === 'string') {
      return p === path;
    } else if (typeof p === 'object'
      && typeof p.test === 'function'
    ) {
      return p.test(path);
    }

    return false;
  }).length === 1;
};
