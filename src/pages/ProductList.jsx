import { useSearchParams } from 'react-router'
import { fetchProducts } from '../api/productsApi.js'
import ProductCard from '../components/ProductCard.jsx'
import { useFetch } from '../hooks/useFetch.js'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const { loading, error, data: products } = useFetch(fetchProducts, [])

  function updateFilter(name, value) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      if (value) {
        next.set(name, value)
      } else {
        next.delete(name)
      }
      return next
    }, { replace: true })
  }

  if (loading) return <p role="status">Loading products...</p>
  if (error) return <p role="alert">Could not load products. {error.message}</p>

  const categories = [...new Set(products.map((product) => product.category))].sort()
  const titleQuery = query.trim().toLowerCase()
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(titleQuery)
    && (!category || product.category === category)
  )

  return (
    <>
      <h1>Products</h1>
      <div className="filters">
        <label>
          Search by title
          <input value={query} onChange={(event) => updateFilter('q', event.target.value)} />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => updateFilter('category', event.target.value)}>
            <option value="">All categories</option>
            {category && !categories.includes(category) && <option value={category}>{category}</option>}
            {categories.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
      </div>
      {filteredProducts.length === 0 ? (
        <p>No products match these filters.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </>
  )
}
