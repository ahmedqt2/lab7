const PRODUCTS_URL = 'https://dummyjson.com/products'

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    const error = new Error(`Request failed (HTTP ${response.status}).`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export async function fetchProducts(signal) {
  const { products } = await fetchJson(`${PRODUCTS_URL}?limit=0`, signal)
  return products
}

export function fetchProduct(id, signal) {
  return fetchJson(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, signal)
}
