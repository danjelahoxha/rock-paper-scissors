// export default defineNuxtConfig({
//   // modules: ["@nuxt/ui"],
//   css: ["@/assets/main.css"],
//   devtools: { enabled: true },
//   postcss: {
//     postcssOptions: {
//       plugins: {
//         tailwindcss: {},
//         autoprefixer: {},
//       },
//     },
//   },
// });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
