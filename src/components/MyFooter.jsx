import { Col, Container, Row } from 'react-bootstrap'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineMail } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MyFooter = () => {
  return (
    <Container fluid className="fixed-bottom bg-light py-3">
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="d-flex flex-column">
            <Link className="nav-link" to="/">
              Biscottificio
            </Link>
            <Link className="nav-link" to="/">
              Sicilia, Castroreale (ME)
            </Link>
            <Link className="nav-link" to="/">
              Via Castroreale, 0
            </Link>
            <Link className="nav-link d-flex align-items-center mt-4" to="/">
              <MdOutlineMail size={20} className="me-2" />
              info@biscottificio.com
            </Link>
            <Link className="nav-link d-flex align-items-center" to="/">
              <FiPhone size={20} className="me-2" />
              +39 333 000 1212
            </Link>
          </Col>

          <Col
            md={4}
            className="text-center d-flex flex-column align-items-center"
          >
            <hr className="w-100 my-2 mt-3 text-black" />
            <p className="fixed-bottom">P.IVA 123456789101112</p>
          </Col>

          <Col md={4} className="d-flex flex-column align-items-end">
            <div>
              <Link className="nav-link small" to="/">
                Privacy Policy
              </Link>
              <Link className="nav-link small" to="/">
                Cookie Policy
              </Link>
              <Link className="nav-link small" to="/">
                Termini e Condizioni
              </Link>
              <Link className="nav-link small" to="/">
                Informazioni Generali di Vendita
              </Link>
              <h5 className="fw-bold text-center mt-3">Social</h5>
              <div className="d-flex justify-content-center gap-4">
                <Link to="/" className="text-dark">
                  <FaFacebook size={25} />
                </Link>
                <Link to="/" className="text-dark">
                  <FaInstagram size={25} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default MyFooter
