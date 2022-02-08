import { presetUno, defineConfig } from "unocss";
import { presetTypography } from "unocss-preset-typography";
import { extractorSvelte } from "@unocss/core";
import presetIcons from "@unocss/preset-icons";

const defaultPreset = presetUno();

/** @type {import('unocss').UserConfig} */
export default defineConfig({
  extractors: [extractorSvelte],
  presets: [
    defaultPreset,
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetTypography({
      cssExtend: {
        "a.heading": {
          "text-decoration": "none",
        },
        "a.heading::before": {
          content: "'#'",
          opacity: 0.1,
          "padding-right": "0.5rem",
          position: "absolute", // FIXME: make this md:
          "margin-left": "-2rem", // FIXME: and this
        },
        ".dark * a.heading::before": {
          opacity: 0.3,
        },
        "a.heading:hover::before": {
          opacity: 1,
        },
        "blockquote::before": {
          content: "open-quote",
          "margin-left": "-0.5rem",
          "margin-top": "0.5rem",
          position: "absolute",
          top: "0",
          left: "0",
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "font-size": defaultPreset.theme.fontSize["6xl"][0],
          color: defaultPreset.theme.colors.gray["600"],
        },
        "blockquote::after": {
          color: defaultPreset.theme.colors.gray["600"],
          content: "close-quote",
          "margin-right": "-0.5rem",
          "margin-bottom": "-1.5rem",
          position: "absolute",
          bottom: "0",
          right: "0",
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "font-size": defaultPreset.theme.fontSize["6xl"][0],
        },
        blockquote: {
          position: "relative",
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "font-style": "normal",
          "font-size": defaultPreset.theme.fontSize["sm"][0],
          "line-height": defaultPreset.theme.fontSize["sm"][1],
          color: defaultPreset.theme.colors.gray["400"],
          "margin-top": "2rem",
          "padding-left": "2rem",
          "padding-right": "2rem",
          "margin-bottom": "2rem",
        },
        figcaption: {
          "font-family": defaultPreset.theme.fontFamily["mono"],
          opacity: 0.6,
          "text-align": "center",
          "line-height": "2",
          "margin-top": "1rem",
          "margin-bottom": "2rem",
        },
        "ul > li.task-list-item": {
          "list-style": "none",
        },
        "ul > li.task-list-item > input": {
          width: "1em",
          height: "1em",
          "margin-right": "1em",
          "margin-left": "-1em",
        },
        "sup > a": {
          "text-decoration": "none",
          "font-family": defaultPreset.theme.fontFamily["mono"],
        },
        ".footnotes > ol::before": {
          content: "'Footnotes'",
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "text-decoration": "underline double 1px",
        },
        ".footnotes": {
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "padding-top": "2rem",
          "font-size": defaultPreset.theme.fontSize["xs"][0],
          "line-height": defaultPreset.theme.fontSize["xs"][1],
        },
        hr: {
          "margin-top": "1em",
          "margin-bottom": "1em",
          height: "2px",
          width: "100%",
          "background-color": defaultPreset.theme.colors.gray["900"] + "1A",
        },
        ".dark * hr": {
          "background-color": defaultPreset.theme.colors.gray["100"] + "33",
        },
        ".footnotes > ol": {
          "list-style": "decimal",
          "padding-top": "1rem",
        },
        ".footnotes > ol > li": {
          "list-style-position": "inside",
        },
        ".footnotes > ol > li > a": {
          "margin-left": "1rem",
        },
      },
    }),
  ],
});
