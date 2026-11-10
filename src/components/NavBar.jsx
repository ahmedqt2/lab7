import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
import { useCartStore } from '../store/cartStore.js'

export default function NavBar({ dark, onToggleTheme }) {
  const { user, dispatch } = useAuth()
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <header>
      <nav className="container nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({count})</NavLink>
        {user ? (
          <>
            <span>{user.username}</span>
            <button type="button" onClick={() => dispatch({ type: 'LOGGED_OUT' })}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        <button type="button" aria-pressed={dark} onClick={onToggleTheme}>
          Dark mode
        </button>
      </nav>
    </header>
  )
}
.