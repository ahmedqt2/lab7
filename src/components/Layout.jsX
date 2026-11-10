import { Outlet } from 'react-router'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import NavBar from './NavBar.jsx'
import '../index.css'

export default function Layout() {
  const [theme, setTheme] = useLocalStorage('assignment7-theme', 'light')
  const dark = theme === 'dark'

  function toggleTheme() {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <NavBar dark={dark} onToggleTheme={toggleTheme} />
      <main className="container">
        <Outlet />
      </main>
      <footer>
        <div className="container">Assignment 7 Shop</div>
      </footer>
    </div>
  )
}
