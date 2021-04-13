import React from "react";
import { Redirect } from "react-router-dom";
import questionService from "../services/QuestionService";
import "./homestyle.css";
import QuestionCard from "./QuestionCard";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Card, Form, Row, Col } from "react-bootstrap";

class SearchLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.myProfile = this.myProfile.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
    this.state = {
      questions1: {
        _embedded: {
          postses: [],
        },
        _links: {
          self: {
            href: "",
          },
        },
      },
      questions2: {
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
    this.tagsString = "";
  }

  myProfile(event) {
    this.props.history.push("/profile/my", {
      //history: this.props.history
      getOwnerProfile: sessionStorage.getItem("getOwnerProfile"),
    });
  }

  sendAnswer(event) {
    if (this.questionObject.body.length > 0) {
      this.questionObject.tags = this.tagsString
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0);
      questionService
        .postQuestion(this.questionObject)
        .then((response) => {
          this.props.history.go(0);
        })
        .catch((error) => {
          this.props.history.go(0);
        });
    }
  }

  componentDidMount() {
    if (this.props.location.state.searchByTags) {
      var tags = this.props.location.state.data.replace(/\s\s+/g, ",");
      questionService.searchByTags(tags).then((response) => {
        this.setState({
          questions1: response.data,
          loaded: true,
        });
      });
    } else {
      questionService
        .elasticSearchByBody(this.props.location.state.data)
        .then((response1) => {
          questionService
            .elasticSearchByName(this.props.location.state.data)
            .then((response2) => {
              this.setState({
                questions2: response2.data,
                questions1: response1.data,
                loaded: true,
              });
            });
        });
    }
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
        <NavbarComponent history={this.props.history} />

        <Row>
          <Col xs={8} id="col2" style={{ marginLeft: "80px" }}>
            {this.state.questions1._embedded !== undefined ? (
              this.state.questions1._embedded.postses.map((question1) => (
                <QuestionCard
                  id={question1.id}
                  body={question1.body}
                  ownerUserId={question1.ownerUserId}
                  ownerDisplayName={question1.ownerDisplayName}
                  upvoteCount={question1.upvoteCount}
                  creationDate={question1.creationDate}
                  tags={question1.tags}
                  links={question1._links}
                  currentHasVoted={question1.currentHasVoted}
                  previousPageLink={this.state.questions1._links.self.href}
                  history={this.props.history}
                />
              ))
            ) : (
              <br />
            )}
            {!this.props.location.state.searchByTags &&
            this.state.questions2._embedded !== undefined ? (
              this.state.questions2._embedded.postses.map((question2) => (
                <QuestionCard
                  id={question2.id}
                  body={question2.body}
                  ownerUserId={question2.ownerUserId}
                  ownerDisplayName={question2.ownerDisplayName}
                  upvoteCount={question2.upvoteCount}
                  creationDate={question2.creationDate}
                  tags={question2.tags}
                  links={question2._links}
                  currentHasVoted={question2.currentHasVoted}
                  previousPageLink={this.state.questions2._links.self.href}
                  history={this.props.history}
                />
              ))
            ) : (
              <br />
            )}
          </Col>
          <Col style={{ margin: "0px" }}>
            <br />
            <br />
            {/* <Card style={{ marginLeft: "10px", marginRight: "80px" }}>
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
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Space separated list of relevant tags. Use - for multi-word tags."
                    onChange={(event) => {
                      this.tagsString = event.target.value;
                    }}
                  />
                  <button className="submitButton" onClick={this.sendAnswer}>
                    Ask
                  </button>
                </Form.Group>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchLandingPage;
