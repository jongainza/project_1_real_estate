import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiSolidSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  let userPhoto = currentUser.photo;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className="mr-auto">
          React-Bootstrap
        </Navbar.Brand>
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <BiSolidSearch />
            </button>
          </form>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <NavDropdown title="User" id="basic-nav-dropdown">
              {userPhoto ? (
                <NavDropdown.Item href="/profile">
                  <img
                    src={userPhoto}
                    alt="profile "
                    className="rounded-circle "
                    style={{
                      height: 4 + "rem",
                      width: 4 + "rem",
                      objectFit: "cover",
                      border: "3px solid black",
                    }}
                  />
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/log-out">LogOut</NavDropdown.Item>
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/log-in">SignIn</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/about">About</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
