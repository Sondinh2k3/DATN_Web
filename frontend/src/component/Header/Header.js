import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">USV Web</Navbar.Brand> */}
        <NavLink to = '/' className='navbar-brand'>USV Web</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to = '/' className='nav-link'>Home</NavLink>
            <NavLink to = '/profile' className='nav-link'>Profile</NavLink>
            <NavLink to = '/history' className='nav-link'>History</NavLink>
            
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link> */}
            
          </Nav>

          <Nav>
          <button className='btn-login'><NavLink to = '/login' className='nav-link'>Log in </NavLink></button>
          <button className='btn-signup'><NavLink to = '/register' className='nav-link'>Sign up</NavLink></button>
          <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Log out
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Contact
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;