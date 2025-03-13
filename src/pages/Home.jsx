import { Col, Container, Image, Row } from 'react-bootstrap'
import '../assets/css/Home.css'
import Carousel from '../components/HomeCarousel'

const Home = () => {
  return (
    <>
      <Container className="position-relative bg-white">
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <div className="d-flex justify-content-center">
              <Carousel />
            </div>
            <h1>Benvenuto nel nostro sito</h1>
            <p>
              Questo è un esempio di testo che appare sotto l'immagine. Quando
              scrolli, il contenuto si sovrappone all'immagine.
            </p>
            <p>Altro testo di esempio per riempire la pagina...</p>
            <p>Altro testo di esempio per riempire la pagina...</p>
            <p>
              Altro testo di esempio per riempire la pagina...lorem ipsum lorem
              ipsum lorem ipsumAltro testo di esempio per riempire la
              pagina...lorem ipsum lorem ipsum lorem ipsumAltro testo di esempio
              per riempire la pagina...lorem ipsum lorem ipsum lorem ipsumAltro
              testo di esempio per riempire la pagina...lorem ipsum lorem ipsum
              lorem ipsumAltro testo di esempio per riempire la pagina...lorem
              ipsum lorem ipsum lorem ipsumAltro testo di esempio per riempire
              la pagina...lorem ipsum lorem ipsum lorem ipsumAltro testo di
              esempio per riempire la pagina...lorem ipsum lorem ipsum lorem
              ipsumAltro testo di esempio per riempire la pagina...lorem ipsum
              lorem ipsum lorem ipsumAltro testo di esempio per riempire la
              pagina...lorem ipsum lorem ipsum lorem ipsumAltro testo di esempio
              per riempire la pagina...lorem ipsum lorem ipsum lorem ipsumAltro
              testo di esempio per riempire la pagina...lorem ipsum lorem ipsum
              lorem ipsumAltro testo di esempio per riempire la pagina...lorem
              ipsum lorem ipsum lorem ipsumAltro testo di esempio per riempire
              la pagina...lorem ipsum lorem ipsum lorem ipsumAltro testo di
              esempio per riempire la pagina...lorem ipsum lorem ipsum lorem
              ipsum
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
