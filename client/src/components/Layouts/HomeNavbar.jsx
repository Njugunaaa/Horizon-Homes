import { Container, Nav, Navbar } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "animate.css"

const HomeNavbar = () => {


  return (
    <div>
    <Navbar
      expand="lg"
      fixed="top"
      className="animate__animated animate__fadeInDown shadow-sm hero-section"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="ms-5 fw-bold">
          Horizon Homes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarText" />
        <Navbar.Collapse id="navbarText">
          <Nav className="me-auto mb-2 mb-lg-0 mx-auto">
            
          </Nav>
          <span className="navbar-text me-5">
          <RouterLink to={`/login`}>
          <button type="button" className="btn btn-outline-secondary">
              Find a Home
          </button>
            </RouterLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    </div>
  )
}

export default HomeNavbar