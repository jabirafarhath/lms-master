import React, { useEffect, useState } from "react";
import { query, collection, getDocs,addDoc } from "firebase/firestore";
import db from "../FireBase";
import { Col, Row } from "react-bootstrap";
import StudentCard from "./StudentCard";
import committeeLogo from "../images/commitee-lg.png";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Form } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AdminStudent() {
  const sRef = collection(db, "student");
  const mRef = collection(db, "marks");
  const [data, setdata] = useState();
  const [count, setcount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
   
    
   load()
  }, []);

  let load=async()=>{
    let student = [];
    getDocs(sRef).then((itm) => {
      console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student = [...student, doc.data()];
        });
      } else {
        setdata({});
      }
    });
    getDocs(mRef).then((itm) => {
      if (itm.size !== 0) {
        let i = 0;
        itm.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          student[i].marks = doc.data();
          i = i + 1;
        });

        setcount(i);
        setdata(student);
      }
    });
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      s_name: e.target.name.value,
      s_id: e.target.regno.value,
      age: e.target.class.value,
      email: e.target.email.value,
      };
    let data2 = {
      s_id: e.target.regno.value,
      email: e.target.email.value,
      s1: e.target.s1.value,
      s2: e.target.s2.value,
      s3: e.target.s3.value,
    };
    //console.log(data);
    const sRef = await addDoc(collection(db, "student"), data);
    const mRef = await addDoc(collection(db, "marks"), data2);
    
    handleClose();
   load()
  };

  return (
    <div
        style={{
          height: "100%",
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
              STUDENTS
        </h1>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ height: "30rem", overflow: "scroll" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  required={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Age"
                  name="class"
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="number" name="regno" required={true} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>SGPA of Semester 1</Form.Label>
                <Form.Control type="number" step={0.1} name="s1" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>CGPA of Semester 2</Form.Label>
                <Form.Control type="number" step={0.1} name="s2" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>CGPA of Semester 3</Form.Label>
                <Form.Control type="number" step={0.1} name="s3" />
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </Box>
        </Modal>
      </Col>

      <Col
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="">
          {data !== undefined &&
            data.map((itm, index) => {
              return <StudentCard data={itm} key={index}></StudentCard>;
            })}
        </Row>
        
      </Col>
      <div className="align-items-center" style={{marginLeft:"35em", marginBottom:"3em"}}>
      <Button className="btn btn-info mt-3" onClick={handleOpen}>Add new Student</Button>
      </div>
      
    </Row>
      </div>
    
  );
}

export default AdminStudent;
