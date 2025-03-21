import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    // Se non c'è token, vai al login
    return <Navigate to="/login" replace />
  }

  // Se c'è token, renderizza la pagina protetta
  return children
}

export default ProtectedRoute
