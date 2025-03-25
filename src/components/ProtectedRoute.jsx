import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import { isTokenValid } from '../utils/auth'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    console.log('Token assente, reindirizzamento al login')
    return <Navigate to="/login" replace />
  }

  try {
    const decoded = jwtDecode(token)

    if (!isTokenValid()) {
      console.log('Token scaduto, reindirizzamento al login')
      localStorage.removeItem('token')
      return <Navigate to="/login" replace />
    }

    if (adminOnly && !decoded.roles?.includes('ROLE_ADMIN')) {
      console.log('Accesso negato, reindirizzamento alla home')
      return <Navigate to="/" replace />
    }

    return children
  } catch (error) {
    console.error('Errore nel decodificare il token:', error)
    localStorage.removeItem('token')
    return <Navigate to="/login" replace />
  }
}

export default ProtectedRoute
