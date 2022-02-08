import { writable as internal, get } from "svelte/store";
import type { Writable } from "svelte/store";

export const storable = <T>(key: string, initial: T = null): Writable<T> => {
  const browser = typeof localStorage != "undefined";
  const value = browser ? JSON.parse(localStorage.getItem(key)) : initial;
  const store = internal(value);
  const { subscribe, set: setStore } = store;

  function setLocalStorage(key, value) {
    if (!browser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    set(value): void {
      setLocalStorage(key, value);
      setStore(value);
    },
    update(updater): void {
      const value = updater(get(store));

      setLocalStorage(key, value);
      setStore(value);
    },
    subscribe,
  };
};
