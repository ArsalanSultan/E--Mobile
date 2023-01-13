import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

// notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  // console.log(email)
  const [password, setPassword] = useState("");
  // console.log(password)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/admin/login",
        { email, password }
      );
      //    console.log(data)
      history.push("/admin/dashboard");
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      //   console.log(error);
      const { response } = error;
      console.log();
      toast.error(`${response.data.errmessage}`);
    }
  };
  return (
    <>
      <Container className="centered">
        <Row>
          <Col className="mx-auto" lg="4" md="8">
            <Form action="" className="form">
              <Card className="card-login">
                <Card.Header className="text-center">
                  <div className="logo-holder d-inline-block align-top">
                    <h1>Login</h1>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Body>
                    <Form.Group onChange={(e) => setEmail(e.target.value)}>
                      <label>
                        Email address <span className="text-danger">*</span>
                      </label>
                      <Form.Control
                        placeholder="Enter Email"
                        type="text"
                        name="email"
                      />
                    </Form.Group>
                    <Form.Group onChange={(e) => setPassword(e.target.value)}>
                      <label>
                        Password <span className="text-danger">*</span>
                      </label>
                      <Form.Control
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card.Body>
                <Card.Footer className="ml-auto mr-auto">
                  <Button
                    className="btn-filled"
                    type="button"
                    onClick={submitHandler}
                  >
                    Login
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}

export default Login;
