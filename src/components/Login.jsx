import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Container, Row } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import Loading from './Loading'
import Error from './Error'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) throw new Error('Credenziali non valide')

      const data = await response.json()
      localStorage.setItem('token', data.token)

      const decodedToken = jwtDecode(data.token)
      console.log('Token decodificato:', decodedToken)

      if (decodedToken.roles?.includes('ROLE_ADMIN')) {
        alert('Login riuscito come Admin!')
        navigate('/account')
      } else {
        alert('Login riuscito!')
        navigate('/account')
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="py-5 w-50">
      <Row className="justify-content-center mt-3">
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
          <Button variant="warning" type="submit" className="mt-3">
            Login
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default Login
