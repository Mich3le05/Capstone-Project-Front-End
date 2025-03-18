import { Col, Container, Row } from 'react-bootstrap'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineMail } from 'react-icons/md'
import { Link } from 'react-router-dom'

const MyFooter = () => {
  return (
    <Container fluid className="footer-color font text-color p-5 pb-2 my-2">
      <Row>
        <Col md={3} className="d-flex flex-column ms-3">
          <Link className="nav-link fw-semibold" to="/">
            Biscottificio Castroreale S.r.l
          </Link>
          <Link className="nav-link" to="/">
            Via Castroreale, 0
          </Link>
          <Link className="nav-link" to="/">
            Sicilia, Castroreale (ME)
          </Link>
          <Link className="nav-link" to="/">
            P.IVA 123456789
          </Link>
          <Link className="nav-link d-flex align-items-center mt-4" to="/">
            <MdOutlineMail size={20} className="me-2 fw-bold" />
            info@biscottificio.com
          </Link>
          <Link className="nav-link d-flex align-items-center" to="/">
            <FiPhone size={20} className="me-2 fw-bold" />
            +39 333 000 1212
          </Link>
        </Col>
        <Col md={2} className="d-flex flex-column ">
          <Link className="nav-link mb-1" to="/">
            Home
          </Link>
          <Link className="nav-link mb-1" to="/">
            Prodotti
          </Link>
          <Link className="nav-link mb-1" to="/">
            Contatti
          </Link>
          <Link className="nav-link mb-1" to="/">
            Compra
          </Link>
        </Col>

        <Col md={2} className="d-flex flex-column">
          <Link className="nav-link  mb-1" to="/">
            Privacy Policy
          </Link>
          <Link className="nav-link mb-1" to="/">
            Termini e Condizioni
          </Link>
          <Link className="nav-link  mb-1" to="/">
            Cookie policy
          </Link>
        </Col>
        <Col md={2} className="d-flex flex-column">
          <h5 className="fw-semibold text-center mb-3">Social</h5>
          <div className="d-flex justify-content-center gap-4">
            <Link to="/" className="text-dark">
              <FaFacebook size={25} />
            </Link>
            <Link to="/" className="text-dark">
              <FaInstagram size={25} />
            </Link>
          </div>
        </Col>
      </Row>
      <Col md={12} className="d-flex justify-content-end align-items-end">
        <p className="text-muted m-0 me-3">
          &copy;{new Date().getFullYear()} Biscottificio Castroreale S.r.l{' '}
        </p>
      </Col>
      <hr className="border-2 border-black w-100 mt-1" />
    </Container>
  )
}

export default MyFooter
