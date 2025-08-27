import { defineNuxtPlugin } from '#app'
import { createNodeHttpRequester } from '@algolia/requester-node-http'

export default defineNuxtPlugin((nuxtApp) => {
  // If we inject $algolia in another plugin, this only replaces the requester on SSR.
  // Avoid doing this inline in each component/route.
  const algoliaClient = nuxtApp.$algolia
  if (algoliaClient?.transporter) {
    algoliaClient.transporter.requester = createNodeHttpRequester()
  }
})
