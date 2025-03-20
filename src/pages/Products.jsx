import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Lavorazione from '../assets/images/Lavorazione.webp'
import '../assets/css/Products.css'

const Products = () => {
  return (
    <>
      <img src={Lavorazione} alt="lavoro" className="fade-bottom hero-img" />
      <Container fluid className="p-5">
        <Row className="justify-content-center mt-3">
          <Col xs={12}>
            <h1 className="text-center text-danger mb-4 titoli-font">
              I nostri prodotti
            </h1>
            <div className="d-flex flex-row justify-content-around text-color center font ps-2 pt-4">
              <p className="ps-3">Tipici Castrensi</p>
              <p className="ps-3">Pasticceria</p>
              <p className="ps-3">I classici</p>
              <p className="ps-3">Visualizza tutti</p>
            </div>
            <hr className="border-2 border-black w-100 mb-5" />
            <Product />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Products
