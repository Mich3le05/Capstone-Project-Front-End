import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'

const Products = () => {
  return (
    <Container fluid className="p-5">
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={4}>
          <h1 className="mb-4 text-danger titoli-font">I nostri prodotti</h1>
          <div className="font text-color pt-4 ps-2">
            <h4>Categorie</h4>
            <hr className="border-2 border-black w-75" />
            <p className="ps-3">Tipici Castrensi</p>
            <p className="ps-3">Pasticceria</p>
            <p className="ps-3">I classici</p>
            <p className="ps-3">Visualizza tutte</p>
            <hr className="border-2 border-black w-75" />
          </div>
        </Col>
        <Col xs={12} md={8}>
          <Product />
        </Col>
      </Row>
    </Container>
  )
}

export default Products
