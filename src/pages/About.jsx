import { Col, Container, Row } from 'react-bootstrap'

const About = () => {
  return (
    <Container className=" container-fluid">
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6} lg={6}>
          <h1 className=" text-danger">Informazioni e contatti</h1>
          <section className="my-5">
            <div>
              <h4 className="mb-1">Ragione sociale</h4>
              <p className="pb-0">Biscottificio Castroreale S.r.l.</p>
              <hr className="border-2" />
            </div>
            <div>
              <h4 className="mb-1">Sede</h4>
              <p className="pb-0">
                Via Castroreale, 0 98053 Castroreale - Messina - Italia
              </p>
              <hr className="border-2" />
            </div>
            <div>
              <h4 className="mb-1">Telefono</h4>
              <p className="pb-0">+39 333 000 1212</p>
              <hr className="border-2" />
            </div>
            <div>
              <h4 className="mb-1">Email</h4>
              <p className="pb-0">info@biscottificio.com</p>
              <hr className="border-2" />
            </div>
            <div>
              <h4 className="mb-1">P.IVA</h4>
              <p className="pb-0">123456789</p>
              <hr className="border-2" />
            </div>
            <div>
              <h4 className="mb-1">Hai bisogno di ulteriori informazioni?</h4>
              <p className="pb-0">
                Siamo a tua disposizione per qualsiasi richiesta
              </p>
              <hr className="border-2" />
            </div>
          </section>
        </Col>
        <Col xs={12} md={6} lg={6}></Col>
      </Row>
    </Container>
  )
}

export default About
