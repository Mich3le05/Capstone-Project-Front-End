import { jwtDecode } from 'jwt-decode'

export const getToken = () => localStorage.getItem('token')

export const getUserInfo = () => {
  const token = getToken()
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Errore nel decodificare il token:', error)
    return null
  }
}

export const isAdmin = () => {
  const userInfo = getUserInfo()
  return userInfo?.roles?.includes('ADMIN')
}

export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const isTokenValid = () => {
  const token = getToken()
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    return Date.now() < decoded.exp * 1000
  } catch {
    return false
  }
}
