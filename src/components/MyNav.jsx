import { useState } from 'react'
import { Container, Nav, Navbar, Badge } from 'react-bootstrap'
import { PiShoppingCartSimpleBold } from 'react-icons/pi'
import { RiUserStarLine } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/images/Logo-bg-1.png'

const MyNav = () => {
  const location = useLocation()
  const [expanded, setExpanded] = useState(false)
  const cartItems = useSelector((state) => state.cart.content)
  const cartItemsCount = cartItems.length
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav-color py-0 shadow-nav fixed-top z-3"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
      onSelect={() => setExpanded(false)}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center py-1"
          onClick={() => setExpanded(false)}
        >
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="mx-auto">
            <Link
              className={`nav-link text-color fw-semibold fs-5 ${
                location.pathname === '/' ? 'active' : ''
              }`}
              to="/"
              onClick={() => setExpanded(false)}
            >
              Home
            </Link>
            <Link
              className={`nav-link text-color fw-semibold fs-5 ${
                location.pathname === '/products' ? 'active' : ''
              }`}
              to="/products"
              onClick={() => setExpanded(false)}
            >
              Prodotti
            </Link>
            <Link
              className={`nav-link text-color fw-semibold fs-5 ${
                location.pathname === '/about' ? 'active' : ''
              }`}
              to="/about"
              onClick={() => setExpanded(false)}
            >
              Contatti
            </Link>
          </Nav>

          <Nav>
            <Link
              className="nav-link text-color fw-semibold"
              to="/account"
              onClick={() => setExpanded(false)}
            >
              <RiUserStarLine size={25} />
            </Link>
            <Link
              className="nav-link text-color fw-semibold position-relative"
              to="/shopping"
              onClick={() => setExpanded(false)}
            >
              <PiShoppingCartSimpleBold size={25} />
              {cartItemsCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute translate-middle"
                  style={{
                    fontSize: '0.65rem',
                    padding: '4px 6px',
                    top: '23%',
                    left: '78%',
                  }}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
