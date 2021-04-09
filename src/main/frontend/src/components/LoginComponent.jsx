import React from "react";
//import { Redirect } from "react-router";
import loginService from "../services/LoginService";
import { Form, Container, Button, Row, Col, Alert } from "react-bootstrap";
import "./LoginSignupHolderStyling.css";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationNumber: "",
      password: "",
      invalidCreds: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log("login data is ", this.state);
    loginService
      .loginAndGetJwt(this.state)
      .then((response) => {
      console.log(response);
      console.log("JWT received ", response.data.jwt.jwt);
      localStorage.setItem("jwt", response.data.jwt.jwt);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem(
        "getOwnerProfile",
        response.data._links.ownerId.href
      );
      this.props.history.push("/home", {});
      })
      .catch((error) => {
        console.log("the error is ", error);
        console.log("that was the error");
        this.setState({
          invalidCreds: true,
        });
      });
  }

  render() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    return (
      <Container>
        <div>
              {this.state.invalidCreds ? (
                <Alert variant="danger">
                  Invalid registration number or password
                </Alert>
              ) : (
                <br />
              )}
          <Row>
            <Col xs={3}></Col>
            <Col>
              <br />
              <Form>
                <Form.Group controlId="registrationNumber">
                  <Form.Label style={{ color: "black" }}>
                    Registration Number
                  </Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Registration Number"
                    onChange={this.handleInput}
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter a valid college registration number.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label style={{ color: "black" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInput}
                    required
                  />
                </Form.Group>
                <br></br>
              </Form>
              <Row>
                <Col xs={2}></Col>
                <button className="submitButton" onClick={this.handleSubmit}>
                  Login
                </button>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default LoginComponent;
