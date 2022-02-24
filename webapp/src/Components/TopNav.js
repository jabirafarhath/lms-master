import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import djs from "../images/djs.png";

class TopNav extends Component {
  render() {
    return (
      <div className="  " >
        <div className="navbar-lg">
        <Navbar bg="info" variant="dark" className=" d-flex" style={{maxHeight: "60px"}}>
  <div className=" p-2">
  <Link to="/" style={{ textDecoration: 'none' }}>
        <Nav className=" navbar-brand " href="#home">LearnEz</Nav>
        </Link>
  </div>
        

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        
        <div class="nav-item dropdown p-2" >
          <button
            class="btn btn-transparent"
            id="navbarDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i
              style={{ color: "white", fontSize: "23px" }}
              class="fa fa-bars"
              aria-hidden="true"
            ></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <Link class="dropdown-item" to="/departments">
              Courses
            </Link>
            <Link class="dropdown-item" to="/library">
              Assignments
            </Link>
            <Link class="dropdown-item" to="/projects">
              Exam
            </Link>
            <Link class="dropdown-item" to="/students">
              Students
            </Link>
          </div>
        </div>
        {/* <Form inline>
            <button className="login-btn">Log In</button>
          </Form> */}
      </Navbar>
        </div>

      </div>
      
    );
  }
}

export default TopNav;
