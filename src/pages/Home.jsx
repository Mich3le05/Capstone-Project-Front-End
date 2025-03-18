import { Button, Col, Container, Row } from 'react-bootstrap'
import '../assets/css/Home.css'
import Carousel from '../components/HomeCarousel'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Castro from '../assets/images/Castroreale.webp'

const Home = () => {
  return (
    <>
      <Container fluid className="px-0">
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <Carousel />
          </div>
          <div className="d-flex justify-content-center">
            <Link className="text-decoration-none" to="/products">
              <Button
                variant="outline-warning"
                className="d-flex align-items-center rounded-5 m-5 py-1 px-4 fw-semibold fs-5 border border-2 border-warning"
              >
                Scopri tutti i prodotti
                <FaArrowRightLong className="ms-2" />
              </Button>
            </Link>
          </div>
          <div className="position-relative w-100 overflow-hidden">
            <div className="image-overlay">
              <h1 className="overlay-text">Scopri le tradizioni</h1>
            </div>
            <img
              src={Castro}
              alt="Castroreale"
              className="w-100 object-fit-cover z-0"
            />
          </div>
        </Col>
      </Container>
    </>
  )
}

export default Home
