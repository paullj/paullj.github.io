import { writable } from "svelte/store";
import { browser } from "$app/env";
import { goto } from "$app/navigation";

const createFilter = (initial: string) => {
  const { subscribe, update, set } = writable(initial);

  return {
    subscribe,
    internalSet: (pattern: string) => set(pattern),
    set: (pattern: string) => {
      set(pattern);

      if (browser) {
        let query = new URLSearchParams();
        if (pattern) {
          query.set("filter", pattern);
        } else {
          query.delete("filter");
        }

        goto(`?${query.toString()}`, {
          keepfocus: true,
        });
      }
    },
  };
};

export const filter = createFilter("");
