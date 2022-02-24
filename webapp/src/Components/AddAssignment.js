import { isInteger } from "lodash";
import React, { useState, useEffect } from "react";
import { addDoc, Timestamp, doc, collection } from "firebase/firestore";
import db from "../FireBase";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";

function AddAssignment(props) {
  const [action, setAction] = useState("ADD");
  const [bname, setBname] = useState("");
  const [author, setAuthor] = useState("");
  const [cid, setCid] = useState(0);
  const [date, setDate] = useState(0);
  const [no, setno] = useState(0);
  const history = useHistory();
  // const [date, setdate] = useState(null);
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleBookname = (e) => {
    setBname(e.target.value);
  };

  const handleEdition = (e) => {
    //console.log(typeof e.target.value);
    setno(parseInt(e.target.value));
  };
  const handleCid = (e) => {
    //console.log(typeof e.target.value);
    setCid(parseInt(e.target.value));
  };
  const handleDate = (e) => {
    //console.log(typeof e.target.value);
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const slug = window.location.href.slice(30);

      var feedback_div = document.getElementById("feedback");
      feedback_div.innerHTML = "";
      if (
        bname === "" ||
        author === "" ||
        no === "" ||
        date === "" ||
        cid === ""
      ) {
        var error =
          "<p class='alert alert-danger'>Please enter the missing values</p>";
      } else {
        console.log(typeof no);
        if (isInteger(no)) {
          var error = "";

          const docRef = await addDoc(collection(db, "assignment"), {
            a_sub: bname,
            a_topic: author,
            a_marks: no,
            a_id: cid,
            a_date: date,
          });
          history.goBack();
        } else {
          var error =
            "<p class='alert alert-danger' >Enter integer for ID, Marks </p>";
        }
      }

      feedback_div.innerHTML = error;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);
  console.log(action);

  return (
    <Col md={12} >
      <div style={{
      alignContent:"center",
      height: "100vh"
      
    }} >
    <div style={{ textAlign: "center" }} >
      <div  style={{  background:"#AFEEEE", width:"60em", alignItems:"center", marginLeft: "8em" }}>
        {action === "ADD" && <h3 className="mt-5" style={{color:"#008B8B"}}>ADD NEW ASSIGNMENT</h3>}
        {action !== "ADD" && <h3>UPDATE ASSIGNMENT</h3>}
        <br></br>
        <div id="feedback"></div>
        <br></br>
        <div className="row align-items-end">
          <div className="col-3">
            <label>Course ID: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleCid}
              value={cid}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
        <br></br>
        <div className="row align-items-end">
          <div className="col-3">
            <label>Subject: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleBookname}
              value={bname}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
        <br></br>

        <div className="row align-items-end">
          <div className="col-3">
            <label>Topic: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleAuthor}
              value={author}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
        <br></br>

        <div className="row align-items-end">
          <div className="col-3">
            <label>Date: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              type="date"
              onChange={handleDate}
              value={date}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
        <br></br>
        <div className="row align-items-end">
          <div className="col-3">
            <label>Max Marks </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleEdition}
              value={no}
              type="number"
              style={{ border: "1px solid" }}
            />
          </div>
        </div>

        <br></br>
        {action === "ADD" && (
          <button class="btn btn-info mb-5" onClick={handleSubmit}>
            CREATE
          </button>
        )}
        {action !== "ADD" && (
          <button class="create-btn" onClick={handleSubmit}>
            UPDATE
          </button>
        )}
      </div>
    </div>
    </div>
    </Col>
    
  );
}

export default AddAssignment;
