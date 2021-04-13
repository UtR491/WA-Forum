import React from "react";
import loginService from "../services/LoginService";
import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import "./LoginSignupHolderStyling.css";

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationNumber: "",
      password: "",
      email: "",
      github: "",
      codeforces: "",
      codechef: "",
      aboutMe: "",
      displayName: "",
      confirmPassowrd: "",
      invalidReg: false,
      passwordConfimMismatch: false,
      errorInSignup: false,
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
    let isnum = /^\d+$/.test(this.state.registrationNumber);
    if (!isnum || this.state.registrationNumber.length !== 8) {
      this.setState({
        invalidReg: true,
        passwordConfimMismatch: false,
        errorInSignup: false,
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordConfimMismatch: true,
        invalidReg: false,
        errorInSignup: false,
      });
      return;
    }

    if (
      this.state.displayName.length > 0 &&
      this.state.password.length > 0 &&
      !this.state.invalidReg &&
      !this.state.passwordConfimMismatch
    ) {
      loginService
        .signup(this.state)
        .then((response) => {
          if (response.status === 200) {
            this.props.history.go(0);
          }
        })
        .catch((error) => {
          this.setState({
            passwordConfimMismatch: false,
            invalidReg: false,
            errorInSignup: true,
          });
        });
    }
  }

  render() {
    return (
      <Container>
        <div>
          <Row>
            <Col>
              {this.state.invalidReg ? (
                <Alert variant="danger">
                  Invalid registration number. Must be all digits and of length
                  8.
                </Alert>
              ) : this.state.passwordConfimMismatch ? (
                <Alert variant="danger">
                  Password and Confirm Password don't match.
                </Alert>
              ) : this.state.errorInSignup ? (
                <Alert variant="danger">
                  There was an error in signup. Maybe the registration number
                  already exists in our databases.
                </Alert>
              ) : (
                <br />
              )}
              <br />
              <Form style={{ color: "black" }}>
                <Form.Row>
                  <Form.Group as={Col} controlId="displayName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Your Name"
                      onChange={this.handleInput}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="registrationNumber">
                    <Form.Label>Registration Number</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Registration Number"
                        onChange={this.handleInput}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="email">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email ID"
                    onChange={this.handleInput}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={this.handleInput}
                      required
                      type="password"
                      placeholder="Password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Provide a password
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      onChange={this.handleInput}
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Password and confirm password don't match
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Label>Usernames</Form.Label>
                <Form.Row>
                  <Form.Group as={Col} controlId="github">
                    <Form.Control
                      type="text"
                      placeholder="Github"
                      onChange={this.handleInput}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="codeforces">
                    <Form.Control
                      type="text"
                      placeholder="Codeforces"
                      onChange={this.handleInput}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="codechef">
                    <Form.Control
                      type="text"
                      placeholder="Codechef"
                      onChange={this.handleInput}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>About You</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    controlId="aboutMe"
                    onChange={this.handleInput}
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col xs={4}></Col>
                </Row>
              </Form>
              <button className="submitButton" onClick={this.handleSubmit}>
                Sign Up
              </button>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default SignupComponent;
