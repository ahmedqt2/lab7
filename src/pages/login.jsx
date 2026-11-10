import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { login } from '../api/authApi.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [attempt, setAttempt] = useState(null)
  const [error, setError] = useState('')
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const returnTo = location.state?.from ?? '/'

  useEffect(() => {
    if (!attempt) return

    let active = true

    async function signIn() {
      try {
        const user = await login(attempt.username, attempt.password)
        if (!active) return
        dispatch({ type: 'LOGGED_IN', user })
        navigate(returnTo, { replace: true })
      } catch (error) {
        if (!active) return
        setError(error.message)
        setAttempt(null)
      }
    }

    signIn()
    return () => { active = false }
  }, [attempt, dispatch, navigate, returnTo])

  function handleSubmit(event) {
    event.preventDefault()
    if (attempt) return
    setError('')
    setAttempt({ username: username.trim(), password })
  }

  return (
    <>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input autoComplete="username" required value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" autoComplete="current-password" required value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit" disabled={attempt !== null}>Sign in</button>
        {attempt && <p role="status">Signing in...</p>}
        {error && <p role="alert">{error}</p>}
      </form>
    </>
  )
}
