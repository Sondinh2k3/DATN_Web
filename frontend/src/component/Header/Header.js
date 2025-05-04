import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { apiLogout } from '../../services/auth';
import { getCurrentUser } from '../../services/auth';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    try {
      const success = apiLogout();
      if (success) {
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">USV Web</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">USV Web</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
            <NavLink to="/history" className="nav-link">History</NavLink>
            
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link> */}
            
          </Nav>

          <Nav>
            <NavDropdown 
              title={currentUser?.email || "Settings"} 
              id="basic-nav-dropdown"
              show={showDropdown}
              onToggle={(nextShow) => setShowDropdown(nextShow)}
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;