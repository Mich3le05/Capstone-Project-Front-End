import { Button, Col, Container, Row } from 'react-bootstrap'
import '../assets/css/Home.css'
import Carousel from '../components/HomeCarousel'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Castro from '../assets/images/Castro.jpg'
import Italia from '../assets/images/Italia.png'
import Pacchi from '../assets/images/Pacchi.png'
import Spiga from '../assets/images/spiga.png'

const Home = () => {
  return (
    <>
      <Container fluid className="px-0">
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <Carousel />
          </div>
          <div className="d-flex justify-content-center mb-5">
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

          <div className="position-relative pb-3">
            <img
              src={Castro}
              alt="Castroreale"
              className="w-100 z-0 fade-top-bottom"
            />
            <div className="top position-absolute">
              <h1 className="text-color fw-semibold titoli-font fs">
                Scopri le tradizioni
              </h1>
            </div>
          </div>

          <h1 className="p-5 text-danger titoli-font fw-semibold">
            I nostri valori
          </h1>
          <section className="py-5 text-color font">
            <Row className="justify-content-center text-center">
              <Col xs={12} md={4} className="mb-4">
                <div className="image-container">
                  <img src={Italia} alt="spiga" className="img-fluid" />
                </div>
                <p className=" fs-4 mt-5">
                  Prodotti tipici di <span className=" fw-semibold">ALTA </span>
                  qualità
                </p>
              </Col>
              <Col xs={12} md={4} className="mb-4">
                <div className="image-container">
                  <img src={Spiga} alt="italia" className="img-fluid" />
                </div>
                <p className=" fs-4 mt-5">
                  Ingredienti <span className=" fw-semibold">NATURALI</span> a
                  km 0{' '}
                </p>
              </Col>
              <Col xs={12} md={4} className="mb-4">
                <div className="image-container">
                  <img src={Pacchi} alt="pacchi" className="img-fluid" />
                </div>
                <p className=" fs-4 mt-5">
                  <span className=" fw-semibold"> DISTRIBUZIONE</span> a livello
                  internazionale
                </p>
              </Col>
              <div className="d-flex justify-content-end pe-2">
                <Link className="text-decoration-none" to="/products">
                  <Button
                    variant="outline-warning"
                    className="d-flex align-items-center rounded-5 m-5 mt-4 py-1 px-4 fw-semibold fs-5 border border-2 border-warning"
                  >
                    Scopri tutti i prodotti
                    <FaArrowRightLong className="ms-2" />
                  </Button>
                </Link>
              </div>
            </Row>
          </section>
        </Col>
      </Container>
    </>
  )
}

export default Home
