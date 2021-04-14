import React from "react";
import { Tabs, Tab, Container, Col, Row, Alert } from "react-bootstrap";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import "./LoginSignupHolderStyling.css";
import ParticleBackground from "./ParticleBackground";
import logo from "./logo.png";
import logofinal from "./logofinal.png";
class LoginSignupHolder extends React.Component {
  render() {
    return (
      <div>
        <ParticleBackground />

        <Container class="mx-auto" id="text_div" className="center_all">
          <Row>
            <Col id="introcol" sm={4}>
              <Row id="logo">
                <img src={logofinal} alt="Logo Here" width="300"></img>
              </Row>
              <Row>
                <h1 id="intromain">
                  <strong style={{ color: "white" }}>WA-Forum</strong>
                </h1>
                <strong>
                  <text style={{ color: "white" }} id="introsecondary">
                    Get all your doubts answered,by people you know...
                  </text>
                </strong>
              </Row>
            </Col>

            <Col sm={8}>
              {this.props.location.state !== undefined ? (
                this.props.location.state.redirected ? (
                  <Alert variant="danger">
                    You must sign up or login to proceed.
                  </Alert>
                ) : (
                  <Alert variant="success">Signed Out Successfully!</Alert>
                )
              ) : (
                <br />
              )}

              <Container id="holder">
                <Tabs
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
                  fill
                >
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
        </Container>
      </div>
    );
  }
}

export default LoginSignupHolder;
