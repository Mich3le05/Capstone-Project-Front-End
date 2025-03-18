import { Col, Container, Row } from 'react-bootstrap'

const Products = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8} lg={6}>
          <h1>Prodotti</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Products
