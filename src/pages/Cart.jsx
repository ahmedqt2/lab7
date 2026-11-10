import { Link } from 'react-router'
import { useCartStore } from '../store/cartStore.js'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const clear = useCartStore((state) => state.clear)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Browse products</Link></p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(({ id, title, price, quantity }) => (
              <li key={id}>
                <strong>{title}</strong>
                <span>${price.toFixed(2)} each</span>
                <div className="quantity">
                  <button type="button" aria-label={`Decrease quantity of ${title}`}
                    onClick={() => setQuantity(id, quantity - 1)}>-</button>
                  <span>Quantity: {quantity}</span>
                  <button type="button" aria-label={`Increase quantity of ${title}`}
                    onClick={() => setQuantity(id, quantity + 1)}>+</button>
                </div>
                <button type="button" onClick={() => removeItem(id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
          <button type="button" onClick={clear}>Clear cart</button>
        </>
      )}
    </>
  )
}
