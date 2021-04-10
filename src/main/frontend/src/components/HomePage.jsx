import React from "react";
import { Redirect } from "react-router-dom";
import questionService from "../services/QuestionService";
import "./homestyle.css";
import QuestionCard from "./QuestionCard";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Card, Form, Row, Container, Col, Button } from "react-bootstrap";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.myProfile = this.myProfile.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
    this.state = {
      questions: {
        _embedded: {
          postses: [],
        },
        _links: {
          self: {
            href: "",
          },
        },
      },
    };
    this.questionObject = {
      body: "",
      tags: [],
    };
  }

  myProfile(event) {
    this.props.history.push("/profile/my", {
      //history: this.props.history
      getOwnerProfile: sessionStorage.getItem("getOwnerProfile"),
    });
  }

  sendAnswer(event) {
    if (this.questionObject.body.length > 0) {
      questionService
        .postQuestion(this.questionObject)
        .then((response) => {
          console.log("question was asked....", response);
          this.props.history.go(0);
        })
        .catch((error) => {
          console.log("error");
          this.props.history.go(0);
        });
    }
  }

  componentDidMount() {
    questionService.getQuestions().then((response) => {
      this.setState({
        questions: response.data,
        loaded: true,
      });
    });
  }

  render() {
    if (sessionStorage.getItem("jwt") === null) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              redirected: true,
            },
          }}
        />
      );
    }

    return (
      <div className="App">
        <NavbarComponent history={this.props.history} isHome={true} />

        <Row>
          <Col xs={8} id="col2" style={{ marginLeft: "80px" }}>
            {this.state.questions._embedded.postses.map((question) => (
              <QuestionCard
                id={question.id}
                body={question.body}
                ownerUserId={question.ownerUserId}
                ownerDisplayName={question.ownerDisplayName}
                upvoteCount={question.upvoteCount}
                creationDate={question.creationDate}
                tags={question.tags}
                links={question._links}
                currentHasVoted={question.currentHasVoted}
                previousPageLink={this.state.questions._links.self.href}
                history={this.props.history}
              />
            ))}
          </Col>
          <Col style={{ margin: "0px" }}>
            <br />
            <br />
            <Card style={{ marginLeft: "10px", marginRight: "80px" }}>
              <Card.Header style={{ textDecorationAlign: "left" }}>
                Have a doubt?
              </Card.Header>
              <Card.Body>
                <Form.Group
                  controlId="exampleForm.ControlTextarea1"
                  style={{ margin: "0px" }}
                >
                  <Form.Control
                    as="textarea"
                    rows={15}
                    placeholder="Ask your doubt..."
                    onChange={(event) => {
                      this.questionObject.body = event.target.value;
                    }}
                  />
                  <button className="submitButton" onClick={this.sendAnswer}>
                    Ask
                  </button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
