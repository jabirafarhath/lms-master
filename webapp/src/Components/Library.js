import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import _ from "lodash";
import libraryLogo from "../images/library-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import book from "../images/book.png";
import { Link } from "react-router-dom";
import { collection, onSnapshot, getDocs, getDoc,query,where,deleteDoc,doc, DocumentSnapshot } from "firebase/firestore";
import db from "../FireBase";

function Library() {
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
    let book={}
    const q = query(LRef, where("a_sub", "==", `${el.a_sub}`));
    getDocs(q).then((itm) => {
      //console.log(itm.documentId());

      if (itm.size !== 0) {
        itm.forEach((docs) => {
          console.log(docs.id)
          // doc.data() is never undefined for query doc snapshots
         deleteDoc(doc(db, "assignment", `${docs.id}`))
         getB()
        });
      } else {
        
      }
    });
  };
  let getB=async()=>{
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
  }

  useEffect(() => {
   
    
    getB()
  }, []);

  console.log(Books);
  return (
    <div style={{
      justifyContent: "center",
      height: "100vh",
      background: "#E0FFFF",
    }}
    className="d-flex">
      <Row >
        <Col  md={12} style={{ textAlign: "center" }}>
          <h1 className=" mt-5"
              style={{ textAlign: "center", color: "#008B8B" }}>ASSIGNMENTS
              </h1>
          <Link to="/library/add" >
            <p className="btn btn-info  mt-4"   >
              Add New Assignment
            </p>
          </Link>
        </Col>
        {/* <Col md={1}></Col> */}


        <Col  md={12}>
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
                      <p>
                        <button
                          class="btn btn-danger"
                          aria-hidden="true"
                          onClick={() => handleDelete(el)}>Delete
                        </button>
                      </p>
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

export default Library;
