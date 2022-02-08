import { writable, derived } from "svelte/store";
import { storable } from "./storable";

const ALL_THEMES = ["system", "light", "dark"] as const;
type ThemesTuple = typeof ALL_THEMES;
type Themes = ThemesTuple[number];
const theme = storable<Themes>("theme", "system");
const dark = writable<boolean>(false);

export { theme, dark, ALL_THEMES };
