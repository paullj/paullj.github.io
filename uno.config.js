import { presetUno, defineConfig } from "unocss";
import { presetTypography } from "unocss-preset-typography";
import { extractorSvelte } from "@unocss/core";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  extractors: [extractorSvelte],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetTypography(),
  ],
});
