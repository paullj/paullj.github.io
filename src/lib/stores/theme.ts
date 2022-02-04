import { writable } from "svelte/store";
import { storable } from "./storable";

const theme = storable("theme");
const dark = writable(true);

export { theme, dark };
