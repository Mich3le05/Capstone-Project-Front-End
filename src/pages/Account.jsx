import {
  Col,
  Container,
  Row,
  Button,
  Toast,
  ToastContainer,
  Form,
  Alert,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Account = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        console.log('Token decodificato:', decoded)
        setUserInfo(decoded)
      } catch (error) {
        console.error('Errore nel decodificare il token:', error)
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        'http://fiscal-ianthe-mich3le-051d8cd5.koyeb.app/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      )

      if (!response.ok) throw new Error('Credenziali non valide')

      const data = await response.json()
      localStorage.setItem('token', data.token)
      checkAuth()
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserInfo(null)
    setShowToast(true)
    setTimeout(() => {
      navigate('/account')
    }, 2000)
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center font text-color p-5"
    >
      <Row className="mt-3">
        <Col xs={12}>
          {userInfo ? (
            <>
              <h1 className="mb-4 titoli-font text-center">
                {userInfo.roles?.includes('ROLE_ADMIN')
                  ? 'Bentornato Admin!'
                  : 'Il tuo account'}
              </h1>
              <div className="d-flex justify-content-around">
                {userInfo.roles?.includes('ROLE_ADMIN') && (
                  <Link
                    to="/admin/create-product"
                    className="btn btn-primary me-5"
                  >
                    Crea Prodotto
                  </Link>
                )}
                <div>
                  {userInfo.roles?.includes('ROLE_ADMIN') && (
                    <Link to="/products" className="btn btn-danger">
                      Modifica Prodotti
                    </Link>
                  )}
                </div>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="ms-5"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2>Login</h2>
              {isLoading && <Loading />}
              {errorMessage && <Error message={errorMessage} />}
              <Form onSubmit={handleLogin} className="mt-4">
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" me-5"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" me-5"
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="mt-3">
                  Login
                </Button>
              </Form>
            </>
          )}

          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
            >
              <Toast.Body>Logout eseguito correttamente!</Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Account
