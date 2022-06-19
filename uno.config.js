import { presetUno, defineConfig } from "unocss";
import { extractorSvelte } from "@unocss/core";
import { presetTypography } from "@unocss/preset-typography";
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
        "a[target]": {
          position: "relative",
          color: defaultPreset.theme.colors.yellow["600"],
        },
        "a[target]::after": {
          display: "inline-block",
          content: "'\u2197'",
          "margin-left": "2.5px;",
        },
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
          opacity: 0.2,
        },
        "blockquote::after": {
          content: "close-quote",
          "margin-right": "-0.5rem",
          "margin-bottom": "-1.5rem",
          position: "absolute",
          bottom: "0",
          right: "0",
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "font-size": defaultPreset.theme.fontSize["6xl"][0],
          opacity: 0.2,
        },
        blockquote: {
          position: "relative",
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "font-style": "normal",
          "font-weight": "bold",
          "font-size": defaultPreset.theme.fontSize["sm"][0],
          "line-height": defaultPreset.theme.fontSize["sm"][1],
          opacity: 0.7,
          "margin-top": "2rem",
          "padding-left": "2rem",
          "padding-right": "2rem",
          "margin-bottom": "2rem",
        },
        "figure > img": {
          margin: "auto",
          "max-width": "100%",
        },
        figcaption: {
          "font-family": defaultPreset.theme.fontFamily["mono"],
          "font-size": defaultPreset.theme.fontSize["sm"][0],
          "line-height": defaultPreset.theme.fontSize["sm"][1],
          opacity: 0.7,
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
          "margin-left": "5px",
          "text-decoration": "none",
          "font-family": defaultPreset.theme.fontFamily["mono"],
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
        ".footnotes > ol > li > p:first-child": {
          display: "inline-block",
        },
        ".footnotes > ol > li * a.footnote-backref": {
          "margin-left": "1rem",
          color: defaultPreset.theme.colors.gray["400"],
        },
        ".footnotes > ol > li * a.footnote-backref::before": {
          content: "'[See in context'",
          "margin-right": "5px",
          display: "inline-block",
        },
        ".footnotes > ol > li * a.footnote-backref::after": {
          content: "']'",
        },
        ".remark-oembed-you-tube > iframe": {
          margin: "auto",
          width: "90%",
          height: "auto",
          "aspect-ratio": "var(--aspect-ratio)",
        },
        ".footnotes * .remark-oembed-you-tube > iframe": {
          margin: "0px",
          width: "60%",
          height: "auto",
          "aspect-ratio": "var(--aspect-ratio)",
        },
      },
    }),
  ],
});
