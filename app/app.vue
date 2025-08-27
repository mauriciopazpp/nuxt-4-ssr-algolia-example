<script setup lang="ts">
const { indices } = useAlgoliaIndex()
const { data } = await useAsyncAlgoliaSearch({ indexName: indices.value.products, query: 'Samsung' })
</script>

<template>
  <div>{{ data }}</div>
</template>
