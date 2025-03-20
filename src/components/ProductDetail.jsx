import { Col, Row, Button } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import '../assets/css/Products.css'

const ProductDetail = () => {
  return (
    <div className="mb-4 mb-lg-0 mt-3">
      <Row>
        <Col sm={12}>
          <h1>Biscotto</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={4}>
          <div className="mt-3">
            <img className="book-cover" alt="book selected" />
          </div>
        </Col>
        <Col sm={8}>
          <p>
            <span className="fw-bold">Description:</span>&nbsp;
          </p>
          <p>
            <span className="fw-bold">Price:</span>&nbsp;
          </p>
          <Button className="d-flex align-items-center">
            <span className="me-2">AGGIUNGI AL</span>
            <FaShoppingCart />
          </Button>
          <p>Fai il login per aggiungere il libro al carrello</p>
        </Col>
      </Row>
      <div />
      <Row>
        <Col sm={12}>
          <h3>Clicca su un libro per i dettagli</h3>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail
