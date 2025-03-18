import { Col, Container, Image, Row } from 'react-bootstrap'
import '../assets/css/Home.css'
import Carousel from '../components/HomeCarousel'

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12}>
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
