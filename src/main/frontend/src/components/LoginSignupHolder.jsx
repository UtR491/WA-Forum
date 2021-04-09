import React from "react";
import { Tabs, Tab, Container, Col, Row, Alert } from "react-bootstrap";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import "./LoginSignupHolderStyling.css";

class LoginSignupHolder extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "cadetblue" }}>
        <Row style={{ backgroundColor: "cadetblue" }}>
          <Col xs={4}></Col>
          <Col>
            {this.props.location.state !== undefined ? (
              this.props.location.state.redirected ? (
                <Alert variant="danger">You must sign up or login to proceed.</Alert>
              ) : (
                <Alert variant="success">Signed Out Successfully!</Alert>
              )
            ) : (
              <br />
            )}
            <br />
            <br />
            <Container
              style={{
                color: "white",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login">
                  <Row>
                    <LoginComponent
                      history={this.props.history}
                    ></LoginComponent>
                  </Row>
                </Tab>
                <Tab eventKey="signup" title="Sign Up">
                  <SignupComponent
                    history={this.props.history}
                  ></SignupComponent>
                </Tab>
              </Tabs>
            </Container>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </div>
    );
  }
}

export default LoginSignupHolder;
