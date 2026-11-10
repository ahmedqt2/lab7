import { Link } from 'react-router'

export default function Home() {
  return (
    <>
      <h1>Welcome to the shop</h1>
      <p>Browse the catalog to find products and add them to your cart.</p>
      <Link to="/products">Browse products</Link>
    </>
  )
}
