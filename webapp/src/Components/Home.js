import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import departLogo from "../images/departLogo.png";
import commiteeLogo from "../images/commiteeLogo.png";
import libraryLogo from "../images/libraryLogo.png";
import projectLogo from "../images/projectLogo.png";

class Home extends Component {
  render() {
    return (
      <Row style={{ display: "flex", justifyContent: "center", height: "100vh",background:"#E0FFFF" }}>
        <Col md={4} style={{ marginTop: "6rem" }}>
        <div >
        <div className="mb-3 ">
        <Link to="/departments" >
                
                <button className="btn btn-info"style={{ width:"20em", height: "3em"}}>COURSES</button> 
                             
            </Link>
            </div>
            <div className="mb-3 ">
            <Link to="/Userlibrary">
                
               
                <button className="btn btn-info"style={{ width:"20em", height: "3em"}}>ASSIGNMENTS</button>
                
                
              </Link>
              </div>
              <div className="mb-3">

              <Link to="/notification">
                
                <button className="btn btn-info"style={{ width:"20em", height: "3em"}}>EXAMS</button>
  
              </Link>
              </div>
              <div className="mb-3">
              <Link to="/students">
                
                <button className="btn btn-info"style={{ width:"20em", height: "3em"}}>STUDENTS</button>
                
                
              </Link>
              </div>
        </div>
        </Col>
        
        
      </Row>
    );
  }
}

export default Home;
