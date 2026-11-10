import { useNavigate, useParams } from 'react-router'
import { fetchProduct } from '../api/productsApi.js'
import { useFetch } from '../hooks/useFetch.js'
import { useCartStore } from '../store/cartStore.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, error, data: product } = useFetch(fetchProduct, [id])
  const addItem = useCartStore((state) => state.addItem)

  return (
    <>
      <button type="button" onClick={() => navigate('/products')}>Back to products</button>
      {loading && <p role="status">Loading product...</p>}
      {error && (
        <p role="alert">
          {error.status === 404 ? 'Product not found.' : `Could not load the product. ${error.message}`}
        </p>
      )}
      {product && (
        <article className="product-detail">
          <img src={product.thumbnail} alt={product.title} width="240" height="240" />
          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>${product.price.toFixed(2)}</p>
            <button type="button" onClick={() => addItem(product)}>Add to cart</button>
          </div>
        </article>
      )}
    </>
  )
}
