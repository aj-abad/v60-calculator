const title = "V60 Recipe Calculator";
const tagline = "A simple calculator for V60 coffee recipes";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        style: "overflow: hidden",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title,
      meta: [
        { name: "og:title", content: title },
        {
          name: "og:description",
          content: tagline,
        },
        // { name: "og:image", content: "https://ajabad.com/img/cover.png" },
        { name: "og:url", content: "https://v60-calculator.vercel.app" },
        // { name: "twitter:image", content: "https://ajabad.com/img/cover.png" },
        { name: "twitter:title", content: title },
        {
          name: "twitter:description",
          content: tagline,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@ajvascript" },
        { name: "twitter:creator", content: "@ajvascript" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/img/favicon.png" },
        { rel: "stylesheet", href: "/css/font.css" },
      ],
    },
  },
  build: {
    transpile: ["@headlessui/vue"],
  },
  imports: {
    dirs: ["~/components", "~/layouts", "~/pages", "~/plugins"],
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  modules: ["@nuxtjs/tailwindcss"],
});
