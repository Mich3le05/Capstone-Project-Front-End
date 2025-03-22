import { Col, Container, Row } from 'react-bootstrap'
import LogoutButton from '../components/LogoutButton'

const Account = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8} lg={6} className="p-5">
          <h1>Acconut</h1>
          <LogoutButton />
        </Col>
      </Row>
    </Container>
  )
}

export default Account
