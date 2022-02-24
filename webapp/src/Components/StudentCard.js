import React from "react";
import {Card,Col} from 'react-bootstrap'
function StudentCard({data}) {
  return (
    <Col md={2} style={{marginLeft:"2em",marginTop:"2em"}}>
      {Object.keys(data).length !== 0 ? (
        <Card
          style={{
            width: "13em",
            height: "20em",
            
            
            background:"#AFEEEE"
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Name: {data.s_name}</Card.Title>
            <Card.Text style={{ fontWeight: "500", textAlign: "center" }}>
              <p>ID-{data.s_id}</p>
              <p>AGE-{data.age}</p>
              <p>SGPA</p>
              <p>SEM 1-{data.marks.s1}</p>
              <p>SEM 2-{data.marks.s2}</p>
              <p>SEM 3-{data.marks.s3}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          style={{
            width: "18rem",
            height: "21rem",
            marginTop: "5rem",
            borderRadius: "25",
          }}
        >
          <Card.Body>
            <Card.Text style={{ fontWeight: "500", textAlign: "center" }}>
              <p>No students found</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
}

export default StudentCard;
