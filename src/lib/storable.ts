import { writable as internal, get } from "svelte/store";
import type { Writable } from "svelte/store";

export const storable = <T>(key: string): Writable<T> => {
  const store = internal(null);
  const { subscribe, set } = store;
  const json =
    typeof localStorage != "undefined" ? localStorage.getItem(key) : null;

  if (json) {
    set(JSON.parse(json));
  }

  function updateStorage(key, value) {
    if (typeof localStorage == "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    set(value) {
      updateStorage(key, value);
      set(value);
    },
    update(cb) {
      const value = cb(get(store));

      updateStorage(key, value);
      set(value);
    },
    subscribe,
  };
};
