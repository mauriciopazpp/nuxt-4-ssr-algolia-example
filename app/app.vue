<script lang="ts" setup>
import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch/vue3/es'
const { indices } = useAlgoliaIndex()
const algolia = useAlgoliaRef()
</script>

<template>
  <div>
    <AisInstantSearch :index-name="indices.products" :search-client="algolia">
      <AisSearchBox />
      <AisHits>
        <template #default="{ items }">
          <ul class="flex flex-wrap gap-x-2 gap-y-2">
            <li
              v-for="item in items"
              :key="item.productId"
              class="flex items-center justify-between"
            >
              {{  item.title }}
            </li>
          </ul>
        </template>
      </AisHits>
    </AisInstantSearch>
  </div>
</template>
