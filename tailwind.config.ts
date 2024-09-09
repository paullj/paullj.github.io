import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  darkMode: "class",
  corePlugins: {
    // disable aspect ratio as per docs -> @tailwindcss/aspect-ratio
    aspectRatio: false,
    // disable some core plugins as they are included in the css, even when unused
    touchAction: false,
    ringOffsetWidth: false,
    ringOffsetColor: false,
    scrollSnapType: false,
    borderOpacity: false,
    textOpacity: false,
    fontVariantNumeric: false,
  },
  theme: {
    extend: {
      colors: {
        bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
        textColor: "hsl(var(--theme-text) / <alpha-value>)",
        link: "hsl(var(--theme-link) / <alpha-value>)",
        accent: "hsl(var(--theme-accent) / <alpha-value>)",
        "accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
        quote: "hsl(var(--theme-quote) / <alpha-value>)",
      },
      fontFamily: {
        // Add any custom fonts here
        mono: ['"JetBrains Mono"', ...fontFamily.mono],
        sans: [...fontFamily.sans],
        serif: [...fontFamily.serif],
      },
      transitionProperty: {
        height: "height",
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Remove above once tailwindcss exposes theme type
      typography: (theme) => ({
        cactus: {
          css: {
            "--tw-prose-body": theme("colors.textColor / 1"),
            "--tw-prose-headings": theme("colors.accent-2 / 1"),
            "--tw-prose-links": theme("colors.textColor / 1"),
            "--tw-prose-bold": theme("colors.textColor / 1"),
            "--tw-prose-bullets": theme("colors.textColor / 1"),
            "--tw-prose-quotes": theme("colors.quote / 1"),
            "--tw-prose-code": theme("colors.textColor / 1"),
            "--tw-prose-hr": "0.5px dashed #666",
            "--tw-prose-th-borders": "#666",
          },
        },
        DEFAULT: {
          css: {
            a: {
              "@apply cactus-link no-underline": "",
            },
            strong: {
              fontWeight: "700",
            },
            code: {
              border: "1px dotted #666",
              borderRadius: "2px",
            },
            blockquote: {
              borderLeftWidth: "0",
            },
            hr: {
              borderTopStyle: "dashed",
            },
            thead: {
              borderBottomWidth: "none",
            },
            "thead th": {
              fontWeight: "700",
              borderBottom: "1px dashed #666",
            },
            "tbody tr": {
              borderBottomWidth: "none",
            },
            tfoot: {
              borderTop: "1px dashed #666",
            },
            img: {
              "@apply mx-auto": "",
            },
            sup: {
              "@apply ms-0.5": "",
              a: {
                "@apply bg-none": "",
                "&:hover": {
                  "@apply text-link no-underline bg-none": "",
                },
                "&:before": {
                  content: "'['",
                },
                "&:after": {
                  content: "']'",
                },
              },
            },
            ".aside": {
              "--admonition-color": "var(--tw-prose-quotes)",
              "@apply my-8 pt-4 pb-4 px-4 border rounded-md border-[--admonition-color]": "",
              ".aside-title": {
                "@apply font-bold text-xs flex items-center gap-2 my-0 capitalize text-[--admonition-color]":
                  "",
                "&:before": {
                  "@apply inline-block shrink-0 overflow-visible h-3.5 w-3.5 align-middle content-[''] bg-[--admonition-color]":
                    "",
                  "mask-size": "contain",
                  "mask-position": "center",
                  "mask-repeat": "no-repeat",
                },
              },
              ".aside-content": {
                "@apply text-xs leading-normal": "",
                "> :last-child": {
                  "@apply mb-0": "",
                },
              },
            },
            ".aside.aside-note": {
              "--admonition-color": theme("colors.blue.300"),
              "@apply bg-blue-400/5": "",
              ".aside-title": {
                "&:before": {
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath fill='var(--admonitions-color-tip)' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'%3E%3C/path%3E%3C/svg%3E")`,
                },
              },
            },
            ".aside.aside-tip": {
              "--admonition-color": theme("colors.lime.500"),
              "@apply bg-lime-500/5": "",
              ".aside-title": {
                "&:before": {
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z'%3E%3C/path%3E%3C/svg%3E")`,
                },
              },
            },
            ".aside.aside-important": {
              "--admonition-color": theme("colors.purple.400"),
              "@apply bg-purple-400/5": "",
              ".aside-title": {
                "&:before": {
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'%3E%3C/path%3E%3C/svg%3E")`,
                },
              },
            },
            ".aside.aside-warning": {
              "--admonition-color": theme("colors.orange.400"),
              "@apply bg-orange-400/5": "",
              ".aside-title": {
                "&:before": {
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'%3E%3C/path%3E%3C/svg%3E")`,
                },
              },
            },
            ".aside.aside-caution": {
              "--admonition-color": theme("colors.red.500"),
              "@apply bg-red-500/5": "",
              ".aside-title": {
                "&:before": {
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath d='M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'%3E%3C/path%3E%3C/svg%3E")`,
                },
              },
            },
          },
        },
        sm: {
          css: {
            code: {
              fontSize: theme("fontSize.sm")[0],
              fontWeight: "400",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".cactus-link": {
          "@apply bg-[size:100%_6px] bg-bottom bg-repeat-x": {},
          backgroundImage:
            "linear-gradient(transparent,transparent 5px,hsl(var(--theme-text)) 5px,hsl(var(--theme-text)))",
          "&:hover": {
            "@apply bg-[size:100%_6px] bg-bottom bg-repeat-x bg-[hsl(var(--theme-accent)/0.3)]": {},
            backgroundImage:
              "linear-gradient(transparent,transparent 3px,hsl(var(--theme-accent)) 3px,hsl(var(--theme-accent)))",
          },
        },
        ".title": {
          "@apply text-2xl font-semibold text-accent-2": {},
        },
      });
    }),
  ],
} satisfies Config;
