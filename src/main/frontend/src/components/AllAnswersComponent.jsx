import React from "react";
import { Col, Row } from "react-bootstrap";
import allAnswersService from "../services/AllAnswersService";
import NavbarComponent from "./NavbarComponent";
import { Redirect } from "react-router-dom";
import AnswerCard from "./AnswerCard";
import "./AnswerStyle.css";
import "./LoginSignupHolderStyling.css";
import { Accordion, Card, Form } from "react-bootstrap";

class AllAnswersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: {},
      links: {},
    };
    this.sendAnswer = this.sendAnswer.bind(this);
    this.answerObject = {
      body: "",
    };
    this.onAskerClick = this.onAskerClick.bind(this);
  }

  onAskerClick(event) {
    this.props.history.push(
      "/profile/" + this.props.location.state.ownerUserId,
      { getOwnerProfile: this.props.location.state.ownerProfile }
    );
  }

  sendAnswer() {
    if (this.answerObject.length !== 0)
      allAnswersService
        .sendAnswer(
          this.state.answers.data._links.answerQuestion.href,
          this.answerObject
        )
        .then((response) => {
          this.props.history.go(0);
        });
  }

  componentDidMount() {
    allAnswersService
      .getAllAnswersForAQuestion(this.props.location.state.getAnswers.href)
      .then((response) => {
        this.setState({
          answers: response,
          question: response.data.question,
          links: response.data._links,
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
      <div>
        <NavbarComponent history={this.props.history} />
        <br />
        <Row>
          <Col></Col>
          <Col xs={7}>
            <div>
              <div style={{ color: "white" }}>
                {this.state.answers.data !== undefined
                  ? this.state.answers.data.question.body
                  : ""}
              </div>
              <p style={{ color: "white" }}>
                {" "}
                - Asked By{""}
                <strong className="asker" onClick={this.onAskerClick}>
                  {this.state.question !== undefined
                    ? this.state.question.ownerDisplayName
                    : ""}
                </strong>
              </p>
              <br />
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Give Answer...
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={(event) => {
                            this.answerObject.body = event.target.value;
                          }}
                        />
                      </Form.Group>
                      <button
                        className="submitButton"
                        onClick={this.sendAnswer}
                      >
                        Add your answer
                      </button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <br />
              <br />
              <div>
                {this.state.answers !== undefined &&
                this.state.links.acceptAnswer !== undefined &&
                this.state.answers.data !== undefined &&
                this.state.answers.data.answers.length !== 0 ? (
                  this.state.answers.data.answers.map((answer) => {
                    return (
                      <AnswerCard
                        body={answer.body}
                        id={answer.id}
                        upvoteCount={answer.upvoteCount}
                        currentHasVoted={answer.currentHasVoted}
                        ownerDisplayName={answer.ownerDisplayName}
                        commentCount={answer.commentCount}
                        ownerUserId={answer.ownerUserId}
                        links={answer._links}
                        creationDate={answer.creationDate}
                        history={this.props.history}
                        acceptAnswerLink={this.state.links.acceptAnswer.href}
                        accepted={
                          this.state.question !== undefined &&
                          this.state.question.acceptedAnswerId === answer.id
                        }
                        showAcceptButton={
                          this.state.question.acceptedAnswerId === null &&
                          this.state.question.ownerUserId ===
                            parseInt(sessionStorage.getItem("userId"))
                        }
                      />
                    );
                  })
                ) : (
                  <h1>
                    <strong>There are no answers for this question.</strong>
                  </h1>
                )}
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default AllAnswersComponent;
