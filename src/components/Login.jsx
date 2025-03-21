import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import Loading from './Loading'
import Error from './Error'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true) // Attiviamo il loading

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token) // Salviamo il token
          alert('Login riuscito!')
          navigate('/products') // Reindirizziamo alla pagina dei prodotti
        } else {
          setErrorMessage('Login fallito, controlla le credenziali')
        }
        setIsLoading(false) // Disattiviamo il loading
      })
      .catch((err) => {
        console.error('Errore login:', err)
        setErrorMessage('Si è verificato un errore, riprova più tardi.')
        setIsLoading(false)
      })
  }

  return (
    <div>
      <h2>Login</h2>
      {isLoading && <Loading />}
      {errorMessage && <Error message={errorMessage} />}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
