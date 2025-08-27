// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/algolia'
  ],
  runtimeConfig: {
    algolia: {
      adminApiKey: '',
    },
    public: {
      builderApiKey: '',
      defaultRegion: 'ab',
      sentry: {
        dsn: '',
        environment: '',
      },
      algoliaIndices: {
        bc: {
          products: 'dev_bc_products',
          suggestions: 'dev_bc_products_query_suggestions',
        },
        ab: {
          products: 'dev_ab_products',
          suggestions: 'dev_ab_products_query_suggestions',
        },
      },
    },
  },
  algolia: {
    applicationId: process.env.NUXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
    apiKey: process.env.NUXT_PUBLIC_ALGOLIA_API_KEY || '',

    useFetch: true,
    lite: false,
    cache: false,
    instantSearch: {
      theme: 'reset',
    },
  },
  vite: {
    resolve: {
      alias: {
        'node-fetch': 'isomorphic-fetch',
      },
    },
    server: {
      allowedHosts: ['trailhead.orium.ngrok.dev'],
      cors: {
        origin: ['https://trailhead.orium.ngrok.dev'],
      },
    },
  },
})
