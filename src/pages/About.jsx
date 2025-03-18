import { Col, Container, Row } from 'react-bootstrap'
import Map from '../components/Map'

const About = () => {
  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center mt-3 px-5">
        <Col xs={12} md={6} lg={6}>
          <h1 className=" text-danger titoli-font">Informazioni e contatti</h1>
          <section className="my-5 font">
            <div>
              <h4 className="mb-1 text-color">Ragione sociale</h4>
              <p className="pb-0">Biscottificio Castroreale S.r.l.</p>
              <hr className="border-2 border-black" />
            </div>
            <div>
              <h4 className="mb-1 text-color">Sede</h4>
              <p className="pb-0">
                Via Castroreale, 0 98053 Castroreale - Messina - Italia
              </p>
              <hr className="border-2 border-black" />
            </div>
            <div>
              <h4 className="mb-1 text-color">Telefono</h4>
              <p className="pb-0">+39 333 000 1212</p>
              <hr className="border-2 border-black" />
            </div>
            <div>
              <h4 className="mb-1 text-color">Email</h4>
              <p className="pb-0">info@biscottificio.com</p>
              <hr className="border-2 border-black" />
            </div>
            <div>
              <h4 className="mb-1 text-color">P.IVA</h4>
              <p className="pb-0">123456789</p>
              <hr className="border-2 border-black" />
            </div>
            <div>
              <h4 className="mb-1 text-color">
                Hai bisogno di ulteriori informazioni?
              </h4>
              <p className="pb-0">
                Siamo a tua disposizione per qualsiasi richiesta
              </p>
              <hr className="border-2 border-black" />
            </div>
          </section>
        </Col>
        <Col
          xs={12}
          md={6}
          lg={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Map />
        </Col>
      </Row>
    </Container>
  )
}

export default About
