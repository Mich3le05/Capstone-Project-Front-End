import { Container, Nav, Navbar } from 'react-bootstrap'
import { PiShoppingCartSimpleBold } from 'react-icons/pi'
import { RiUserStarLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo-bg.png'

const MyNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-color py-0">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center py-0"
        >
          <img src={logo} alt="logo" width="160" height="" className="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="mx-auto">
            <Link className="nav-link text-color fw-semibold fs-5" to="/">
              Home
            </Link>
            <Link
              className="nav-link text-color fw-semibold fs-5"
              to="/products"
            >
              Prodotti
            </Link>
            <Link className="nav-link text-color fw-semibold fs-5" to="/about">
              Contatti
            </Link>
          </Nav>

          <Nav>
            <Link className="nav-link text-color fw-semibold" to="/account">
              <RiUserStarLine size={25} />
            </Link>
            <Link className="nav-link text-color fw-semibold" to="/shopping">
              <PiShoppingCartSimpleBold size={25} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
