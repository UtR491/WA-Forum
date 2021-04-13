import React from "react";
import profileService from "../services/ProfileService";
import "./LoginSignupHolderStyling.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import NavBar from "./NavbarComponent";

class EditMyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      github: "",
      codeforces: "",
      codechef: "",
      aboutMe: "",
      displayName: "",
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
    profileService
      .editProfile(this.state)
      .then((response) => {
        this.props.history.push("/home");
      })
      .catch((error) => {
        this.props.history.push("/home");
      });
  }

  render() {
    return (
      <div>
        <NavBar isHome={false} history={this.props.history} />
        <Container
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "8%",
            padding: "10px",
          }}
        >
          <Col>
            <h3 style={{ color: "cadetblue" }}>
              <strong>Fill fields you want to change.</strong>
            </h3>
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
              </Form.Row>

              <Form.Group controlId="email">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email ID"
                  onChange={this.handleInput}
                />
              </Form.Group>

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
                  id="aboutMe"
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
              Make Changes
            </button>
          </Col>
        </Container>
      </div>
    );
  }
}

export default EditMyProfile;
