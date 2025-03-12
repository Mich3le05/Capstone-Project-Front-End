import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { PiShoppingCartSimpleBold } from 'react-icons/pi'
import { RiUserStarLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const MyNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand>Biscottificio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="mx-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/products/:productId">
              Prodotti
            </Link>
            <Link className="nav-link" to="/about">
              Chi siamo
            </Link>
          </Nav>

          <Nav>
            <Link className="nav-link" to="/account">
              <RiUserStarLine size={25} />
            </Link>
            <Link className="nav-link" to="/shopping">
              <PiShoppingCartSimpleBold size={25} />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
