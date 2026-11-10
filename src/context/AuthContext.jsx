import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext(null)

function authReducer(user, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return action.user
    case 'LOGGED_OUT':
      return null
    default:
      return user
  }
}

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(authReducer, null)

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const auth = useContext(AuthContext)
  if (auth === null) {
    throw new Error('useAuth must be used inside an AuthProvider.')
  }
  return auth
}
