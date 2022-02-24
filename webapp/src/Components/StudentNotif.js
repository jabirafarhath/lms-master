import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import db from "../FireBase";
import { Row } from "react-bootstrap";

function StudentNotif() {
  const [notif, setnotif] = useState([]);
  let notifRef = collection(db, "exam");
  useEffect(() => {
    let temp = [];
    getDocs(notifRef).then((itm) => {
      //console.log(itm);
      if (itm.size !== 0) {
        itm.forEach((doc) => {
          temp = [...temp, doc.data()];
        });
        setnotif(temp);
      } else {
        //setdata({});
      }
    });
  }, []);
  console.log(notif);
  return (
    <div>
      <h3 className=" mt-5"
              style={{ textAlign: "center", color: "#008B8B" }}>EXAMS</h3>
              <Row style={{alignItems:"center"}}>
      {notif.map((itm) => {
        return (
          
 <div
            style={{
              background: "white",
              display: "flex",
              width: "20rem",
              marginTop: "2rem",
            }}
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
              

              <p style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>COURSE ID:
                {itm.e_id}
              </p>
              <p style={{marginLeft:"1rem",fontSize: "1.5rem"}}>COURSE: {itm.e_sub}</p>
              <p style={{marginLeft:"1rem"}}>DATE {itm.e_date}</p>
              <p style={{marginLeft:"1rem"}}>TYPE- {itm.e_type}</p>
              <p style={{marginLeft:"1rem"}}>DURATION {itm.e_duration} hours</p>
              <p style={{marginLeft:"1rem"}}>MARKS {itm.e_marks}</p>
            </div>
          </div>
          
         
        );
      })}
      </Row>
    </div>
  );
}

export default StudentNotif;
