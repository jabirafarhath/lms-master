import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LandingPic from "../images/LandingPic.png"
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const auth = getAuth();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [error, seterror] = useState();
  let handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user)
       if(userCredential.user.email=="admin@mec.gmail.com"){
         history.push("/Shome")
       }
       else{
         localStorage.setItem(`student`,`${userCredential.user.email}`)
         history.push("/home")
       }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(errorMessage);
        handleClick();
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Row style={{ display: "flex", justifyContent: "center", height: "100vh",background:"#E0FFFF" }}>
      
      <Col md={8} style={{ marginTop: "6rem" }}>
        <Form
          style={{
            width: "50rem",
            background: "#E0FFFF",
            padding: "1.5rem",
            height: "22rem",
          }}
        > 
        <Form.Label >LOGIN</Form.Label>
          <Form.Group className="mb-3 form" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Button  type="submit" onClick={handleSubmit} className="btn btn-info btn-block" >
            Login
          </Button>
          </Form.Group>
          
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
