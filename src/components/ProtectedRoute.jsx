import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    console.log('Token assente, reindirizzamento al login')
    return <Navigate to="/login" replace />
  }

  try {
    const decoded = jwtDecode(token)
    if (Date.now() >= decoded.exp * 1000) {
      console.log('Token scaduto, reindirizzamento al login')
      localStorage.removeItem('token')
      return <Navigate to="/login" replace />
    }

    if (adminOnly) {
      if (!decoded.roles?.includes('ROLE_ADMIN')) {
        console.log('Accesso negato, reindirizzamento alla home')
        return <Navigate to="/" replace />
      }
    }
  } catch (error) {
    console.error('Errore nel decodificare il token:', error)
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
