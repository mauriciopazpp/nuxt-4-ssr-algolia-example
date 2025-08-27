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
    cybersource: {
      environment: '',
    },
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
      google: {
        mapsApiKey: '',
      },
    },
  },
  // docs: https://algolia.nuxtjs.org/getting-started/configuration
  algolia: {
    // adding applicationId and apiKey here and using process.env is
    // inconsistent with Nuxt convension, but for now!
    // issue: https://github.com/nuxt-modules/algolia/issues/218
    applicationId: process.env.NUXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
    apiKey: process.env.NUXT_PUBLIC_ALGOLIA_API_KEY || '',

    useFetch: true,
    lite: false,
    // if enabled, the cache will not cache by region (ab, bc),
    // @TODO: revisit when implementing the PDP and search page
    cache: false,
    instantSearch: {
      theme: 'reset',
    },
  },
  vite: {
    resolve: {
      alias: {
        // this is needed for SSR algolia on Cloudflare since node-fetch is not supported
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