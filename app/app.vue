<script setup lang="ts">
import { h, provide } from 'vue'
import { renderToString } from 'vue/server-renderer'
import {
  AisInstantSearchSsr,
  AisHits,
  AisConfigure,
  // add other widgets that change the state (RefinementList, SearchBox, etc.)
  createServerRootMixin,
  // @ts-ignore
} from 'vue-instantsearch/vue3/es'

const { indices } = useAlgoliaIndex()

const nuxtApp = useNuxtApp()
const searchClient = nuxtApp.$algolia
const indexName = indices.value.products

// 1) InstantSearch SSR instance via createServerRootMixin
const { instantsearch } = createServerRootMixin({
  searchClient,
  indexName,
}).data()

// 2) On SSR, make the instance available to <AisInstantSearchSsr> via provide
  provide('$_ais_ssrInstantSearchInstance', instantsearch as unknown as any)

// 3) Calculate the state only on the server (Nuxt rejects on the client)
const { data: algoliaState } = await useAsyncData('algolia-state', async () => {
  return instantsearch.findResultsState({
    // Minimal component that exposes `this.instantsearch` and uses the same widgets
    component: {
      $options: {
        components: { AisInstantSearchSsr, AisConfigure, AisHits },
        data() {
          return { instantsearch }
        },
        provide: { $_ais_ssrInstantSearchInstance: instantsearch },
        render() {
          return h(AisInstantSearchSsr, null, () => [
            h(AisConfigure, { hitsPerPage: 12 }),
            h(AisHits),
          ])
        },
      },
    },
    renderToString,
  })
})
</script>

<template>
  <section class="container mx-auto p-6">
    <!-- 4) Render SSR with the same set of widgets used in findResultsState -->
    <AisInstantSearchSsr :state="algoliaState">
      <AisConfigure />
      <AisHits />
    </AisInstantSearchSsr>
  </section>
</template>
