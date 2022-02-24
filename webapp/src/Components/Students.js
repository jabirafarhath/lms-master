import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import committeeLogo from "../images/commitee-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import bulb from "../images/bulb.png";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../FireBase";
import StudentCard from "./StudentCard";

function Students() {
  const [sno, setsno] = useState("");
  const [data, setdata] = useState({});
  const [searched, setsearched] = useState(false);
  const sRef = collection(db, "student");
  const mRef = collection(db, "marks");
  console.log(mRef)
  let email = localStorage.getItem(`student`);

  
  let handleClick = () => {
    let student = {};
    setsearched(true);
    const q = query(sRef, where("email", "==", `${email}`));
    const q2 = query(mRef, where("email", "==", `${email}`));
    getDocs(q).then((itm) => {
      console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student = {
            ...doc.data(),
          };
        });
      } else {
        setdata({});
      }
    });
    getDocs(q2).then((itm) => {
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student.marks = doc.data();
        });
        console.log(student);
        setdata(student);
      }
    });
  };

  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div
    style={{
      height: "100vh",
      background: "#E0FFFF",
    }}
  >
<Row>
  <Col md={12}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
    
    <h1
          className=" mt-5"
          style={{ textAlign: "center", color: "#008B8B" }}
        >
          Profile
    </h1>
    </Col>

      <Col
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StudentCard data={data}></StudentCard>
      </Col>
    </Row>
    </div>
  );
}

export default Students;
