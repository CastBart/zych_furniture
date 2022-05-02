import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from "react-bootstrap/Container";

const MainNavigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">ZychFurniture</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Products" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Swings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Tables
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Chairs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Pergolas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
