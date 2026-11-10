import { Link } from 'react-router'

export default function ProductCard({ product }) {
  const { id, title, price, category, thumbnail } = product
  return (
    <article className="product-card">
      <img src={thumbnail} alt="" loading="lazy" width="160" height="160" />
      <h2><Link to={`/products/${id}`}>{title}</Link></h2>
      <p>{category}</p>
      <p>${price.toFixed(2)}</p>
    </article>
  )
}
