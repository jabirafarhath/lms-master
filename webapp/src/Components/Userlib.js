import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import _ from "lodash";
import libraryLogo from "../images/library-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import book from "../images/book.png";
import { Link } from "react-router-dom";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import db from "../FireBase";

function UserLib() {
  const [tag, setTag] = useState("bname");
  const [order, setOrder] = useState("1");
  const [noOfBooks, setBookNo] = useState(0);
  const [noOfAuthors, setAuthorNo] = useState(0);
  const [noOfEditions, setEditionNo] = useState(0);
  const [books, setBooks] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const LRef = collection(db, "assignment");
  const [Books, setbooks] = useState([]);
  async function getCount() {
    try {
      const doc = await fetch("/api/assignment/count");
      const { noOfBooks, noOfAuthors, noOfEditions } = await doc.json();
      setBookNo(noOfBooks);
      setAuthorNo(noOfAuthors);
      setEditionNo(noOfEditions);
    } catch (err) {
      console.log(err);
    }
  }

  async function getBooks() {
    try {
      const doc = await fetch(`/api/assignment?tag=${tag}&order=${order}`);

      const books = await doc.json();
      console.log({ doc: books });
      setBooks(books);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      const doc = await fetch(
        `/api/assignment/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setBooks(result);
    } else {
      const doc = await fetch(`/api/assignment?tag=bname`);
      const result = await doc.json();
      setBooks(result);
    }
  };
  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") handleSubmit(e);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (order === "1") setOrder("-1");
    else setOrder("1");
  };

  const handleDelete = async (el) => {
    try {
      await fetch(
        `api/assignment/delete?bname=${el.bname}&edition=${el.edition}`,
        {
          method: "POST",
        }
      );
      const updatedBooks = _.remove(books, function (n) {
        return n.bname === el.bname;
      });
      setBooks(updatedBooks);
    } catch (err) {}
  };

  useEffect(() => {
    let books = [];
    getDocs(LRef).then((itm) => {
      //console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          books = [...books, doc.data()];
        });
        setbooks(books);
      } else {
        //setdata({});
      }
    });
  }, []);

  console.log(Books);
  return (
    <div style={{
      justifyContent: "center",
      height: "100vh",
      background: "#E0FFFF",
    }}>
      <Row>
        <Col className="leftside" md={12}>
          
          <p className="page-title mt-3" style={{color:"#008B8B"}}>ASSIGNMENTS</p>

          <br></br>
        </Col>
        {/* <Col md={1}></Col> */}
        <Col className="rightside" md={12}>
          
          {/* MAIN */}
          <Row className="homerow justify-content-md-center">
            {Books.length > 0 &&
              Books.map((el, id) => (
                <Col
                  md={3}
                  key={id}
                  className="p-2 m-3">
                  <Row style={{ height: "100%" }}>
                  <div className="card " style={{ background: "#AFEEEE", width:"50em" }}>
                    <Col md={8}>
                      
                      
                      <h4 className="card-title ">ID: {el.a_id}</h4>
                      <p> SUBJECT: {el.a_sub}</p>
                      <p> TOPIC: {el.a_topic}</p>
                      <p> DATE: {el.a_date}</p>
                      <p> MARKS: {el.a_marks}</p>
                      
                    </Col>
                    </div>
                  </Row>
                
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UserLib;
