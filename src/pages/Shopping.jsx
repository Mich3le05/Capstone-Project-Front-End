import { Col, Container, Row } from 'react-bootstrap'
import Cart from '../components/Cart'
import CartIndicator from '../components/CartIndicator'

const Shopping = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8} lg={6}>
          <CartIndicator />
          <Cart />
        </Col>
      </Row>
    </Container>
  )
}

export default Shopping
