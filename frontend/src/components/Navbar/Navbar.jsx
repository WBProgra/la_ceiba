import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const textStyle = { textDecoration: "None", color: "white" };
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link style={textStyle} to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={textStyle} to="/products/">
                Products
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link style={textStyle} to="/category/">
                Category
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
