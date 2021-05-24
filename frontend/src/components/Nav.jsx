import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function Header(props) {
  if (localStorage.getItem("token")) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ marginLeft: "10px" }} href="#home">
          {props.Name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              
              <Link to="/">Home</Link>
            </Nav.Link>

            <Nav.Link href=""><Link to="/logout">Logout</Link></Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
    );
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand style={{ marginLeft: "10px" }} href="#home">
        {props.Name}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="">
          <Link to="/register">Sinup</Link>
           
          </Nav.Link>

          <Nav.Link href=""><Link to="/login">Login</Link></Nav.Link>
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  );
}
