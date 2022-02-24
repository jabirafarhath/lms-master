import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import departmentLogo from "../images/department-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import vector from "../images/Vector.png";
import { collection, getDocs } from "firebase/firestore";
import db from "../FireBase";

function Department() {
  const [data, setdata] = useState([]);
  const [courseCount, setcourseCount] = useState(0);
  const [teacherCount, setteacherCount] = useState(0);

  useEffect(() => {
    const depRef = collection(db, "courses");
    let temp = [];
    let courseCount = 0,
      teacherno = 0;
    let getdata = async () => {
      const querySnapshot = await getDocs(depRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp = [...temp, doc.data()];
        courseCount = courseCount + 1;
        teacherno = teacherno + doc.data().Teachercount;
        console.log(temp);
        console.log("kii" + teacherno + "hii");
      });
      setdata(temp);
      setcourseCount(courseCount);
      setteacherCount(teacherno);
    };
    getdata();
  }, []);

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          height: "100vh",
          background: "#E0FFFF",
        }}
        className="d-flex"
      >
        <Row>
          <div>
            <h1
              className="page-title mt-5"
              style={{ textAlign: "center", color: "#008B8B" }}
            >
              COURSES
            </h1>
            <p style={{ textAlign: "center" }}>No. of courses: {courseCount}</p>
          </div>

          {/* <Col md={1}></Col> */}
          <Col md={12}>
            <Row style={{ height: "100%" }}>
              {data.map((itm) => {
                return (
                  <Col md={3}>
                    <div className="card " style={{ background: "#AFEEEE" }}>
                      <h5
                        style={{ textAlign: "center", marginTop: "1em" }}
                        className="card-title"
                      >
                        {itm.c_name}
                      </h5>
                      <p style={{ textAlign: "center" }}>
                        Course Id: {itm.c_id}
                      </p>
                      <p style={{ textAlign: "center" }}>Name: {itm.c_name}</p>
                      <p style={{ textAlign: "center" }}>
                        Credit: {itm.credit}
                      </p>
                      <p style={{ textAlign: "center" }}>Type: {itm.type}</p>
                      <p style={{ textAlign: "center" }}>Hours: {itm.hours}</p>
                      <p style={{ textAlign: "center" }}>
                        Faculty Incharge: {itm.f_id}
                      </p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Department;
