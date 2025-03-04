import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const MyNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Biscottificio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">I nostri valori</Nav.Link>
            <Nav.Link href="#pricing">Contatti</Nav.Link>
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
