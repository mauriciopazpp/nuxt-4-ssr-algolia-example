import { defineNuxtPlugin } from '#app'
import { createNodeHttpRequester } from '@algolia/requester-node-http'

export default defineNuxtPlugin((nuxtApp) => {
  const algoliaClient = nuxtApp.$algolia
  if (algoliaClient?.transporter) {
    algoliaClient.transporter.requester = createNodeHttpRequester()
  }
})
