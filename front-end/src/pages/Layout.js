import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { matchPath, useLocation } from "react-router";

const Layout = () => {
  const { pathname } = useLocation();

  const match = matchPath("/town/*", pathname);
  let backBtn;
  if (match !== null) {
    backBtn = (
      <Navbar.Brand href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="40"
          fill="currentColor"
          className="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      </Navbar.Brand>
    );
  }
  return (
    <>
      {/* {console.log(pathnameBase)} */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {backBtn}
          <Navbar.Brand href="#home">Fuel Map</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
