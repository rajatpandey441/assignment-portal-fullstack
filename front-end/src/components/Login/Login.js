import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider/UserProvider";

export const Login = () => {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLoginRequest = () => {
    const reqBody = {
      username: userName,
      password: password,
    };

    // const reqBody = {
    //     username: "abcduser",
    //     password: "1234",
    //   };
    fetch("api/v1/auth/login", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          user.setJwt(response.headers.get("authorization"));
          //window.location.href = "dashboard";
          navigate("/dashboard");
        } else return Promise.reject("Invalid Request");
      })
      .catch((message) => {
        alert(message);
      });
  };
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Enter your username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-3 flex-md-row justify-content-md-between"
          >
            <Button
              size="lg"
              type="button"
              onClick={onLoginRequest}
              id="submit"
            >
              Login
            </Button>
            <Button
              size="lg"
              type="button"
              variant="secondary"
              onClick={onLoginRequest}
              id="submit"
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
