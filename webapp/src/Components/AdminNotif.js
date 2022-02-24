import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import db from "../FireBase";
import {Row,Col,Button} from "react-bootstrap"
import BasicModal from "./Modal"
function AdminNotif() {
  const [notif, setnotif] = useState([]);
  const [open, setOpen] = React.useState(false);
 
  let notifRef = collection(db, "exam");

  let load=async()=>{
    let temp = [];
    getDocs(notifRef).then((itm) => {
      // console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          temp = [...temp, doc.data()];
        });
        setnotif(temp);
      } else {
        //setdata({});
      }
    });
  }
  useEffect(() => {
   
   
    load()
  }, []);
  console.log(notif);
  return (
      <div style={{background:"E0FFFF"}}>
    <h3 className=" mt-5"
              style={{ textAlign: "center", color: "#008B8B" }}>EXAMS</h3>
    <Row style={{alignItems:"center"}}>
      {notif.map((itm,index) => {
        return (
          <div
            style={{
              background: "w#AFEEEE",
              display: "flex",
              width: "20rem",
              marginTop: "2rem",
            }}
            key={index}
          >
            <p
              style={{
                marginLeft: "1rem",
                fontSize: "2rem",
                background: "#AFEEEE",
                color: "white",
                padding: "0.5rem",
              }}
            >
            </p>
            <div>
              {" "}
              <p style={{marginLeft:"1rem"}}><b>DATE</b>: {itm.e_date}</p>
              <p style={{marginLeft:"1rem"}}><b>ID</b>: {itm.e_id}</p>
              <p style={{marginLeft:"1rem"}}><b>SUBJECT</b>: {itm.e_sub}</p>
              <p style={{marginLeft:"1rem"}}><b>TYPE</b>: {itm.e_type}</p>
              <p style={{marginLeft:"1rem"}}><b>DURATION</b>: {itm.e_duration} hours</p>
              <p style={{marginLeft:"1rem"}}><b>MARKS</b>: {itm.e_marks}</p>
            </div>
          </div>
          
        );
      })}
      <p className = "btn btn-info mt-3" style={{width:"8rem",marginLeft:"2rem" ,alignItems:"center"}} onClick={()=>setOpen(true)}>ScheduleExam</p>
      <BasicModal open={open} setOpen={setOpen} load={load} ></BasicModal>
    </Row>
    </div>
  );
}

export default AdminNotif