import {
  Col,
  Container,
  Row,
  Button,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const Account = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
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
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setShowToast(true)
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} className="p-5 text-center">
          {userInfo && (
            <>
              <h1 className="mb-4">
                {userInfo.roles?.includes('ROLE_ADMIN')
                  ? 'Bentornato Admin!'
                  : 'Il tuo account'}
              </h1>
              {userInfo.roles?.includes('ROLE_ADMIN') && (
                <Link
                  to="/admin/create-product"
                  className="btn btn-primary me-5"
                >
                  Crea Prodotto
                </Link>
              )}
            </>
          )}
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>

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
