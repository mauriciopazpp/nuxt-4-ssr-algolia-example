/**
 * Get the Algolia indices for the current region
 */
export const useAlgoliaIndex = () => {
  const region = 'bc'

  const config = useRuntimeConfig().public.algoliaIndices

  const bc = {
    products: config.bc.products,
    suggestions: config.bc.suggestions,
  }
  
  const ab = {
    products: config.ab.products,
    suggestions: config.ab.suggestions,
  }

  const indices = computed(() => (region === 'bc' ? bc : ab))

  return {
    indices,
  }
}
