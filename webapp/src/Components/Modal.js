import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Form } from "react-bootstrap";
import { addDoc, Timestamp, doc, collection } from "firebase/firestore";
import db from "../FireBase";

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

export default function BasicModal({ open, setOpen, load }) {
  const [Sdata, setSdata] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      e_type: e.target.type.value,
      e_date: new Date(e.target.date.value).toDateString(),
      e_duration: parseInt(e.target.duration.value),
      e_marks: parseInt(e.target.marks.value),
      e_sub: e.target.subject.value,
      e_id: parseInt(e.target.id.value)
    };
    //console.log(data);
    const nRef = await addDoc(collection(db, "exam"), data);
    handleClose();
    load();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit} style={{background:"E0FFFF"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Course ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter course Id"
                  name="id"
                />

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter exam subject"
                    name="subject"
                  />
                </Form.Group>
              </Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type of exam"
                name="type"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="date" name="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Duration(in hours)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter exam duration"
                name="duration"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter exam marks"
                name="marks"
              />
            </Form.Group>

            <Button type="submit" className="btn btn-info">
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
