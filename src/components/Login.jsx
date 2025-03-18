import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Error from './Error'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    setError('')

    const userCredentials = { username, password }

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed')
        }
        return response.json() // Il backend restituisce il token qui
      })
      .then((data) => {
        localStorage.setItem('jwtToken', data.token) // Salvi il token nel localStorage
        navigate('/') // Reindirizza alla home o alla pagina desiderata
      })
      .catch(() => {
        setError('Username o password errati')
      })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <Error message={error} />}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
