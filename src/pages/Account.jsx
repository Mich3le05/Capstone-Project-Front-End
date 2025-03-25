import { Col, Container, Row } from 'react-bootstrap'
import LogoutButton from '../components/LogoutButton'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const Account = () => {
  const [userInfo, setUserInfo] = useState(null)

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

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8} lg={6} className="p-5 text-center">
          {userInfo && (
            <>
              <h1>
                {userInfo.roles?.includes('ROLE_ADMIN')
                  ? 'Bentornato Admin!'
                  : 'Il tuo account'}
              </h1>
              {userInfo.roles?.includes('ROLE_ADMIN') && (
                <Link
                  to="/admin/create-product"
                  className="btn btn-primary mb-3"
                >
                  Crea Prodotto
                </Link>
              )}
            </>
          )}
          <LogoutButton />
        </Col>
      </Row>
    </Container>
  )
}

export default Account
