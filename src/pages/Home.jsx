import { Col, Container, Image, Row } from 'react-bootstrap'
import '../assets/css/Home.css'
import Carousel from '../components/HomeCarousel'

const Home = () => {
  return (
    <>
      <Container fluid className="py-5">
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={12}>
            <div className="d-flex justify-content-center">
              <Carousel />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
