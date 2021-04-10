import React from "react";
import "./Profilestyle.css";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {Redirect} from "react-router-dom"
import {
  Row,
  Container,
  Col,
  Button,
  Tabs,
  Tab,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

import questionService from "../services/QuestionService";
import SideNavPage from "./SideNavigation";

import { Icon, InlineIcon } from "@iconify/react";
import codechefIcon from "@iconify-icons/simple-icons/codechef";

import githubFill from "@iconify-icons/akar-icons/github-fill";

import codeforcesIcon from "@iconify-icons/simple-icons/codeforces";
import userService from "../services/UserService";
import QuestionAnswerComponent from "./QuestionAnswerComponent";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {
        _embedded: {
          postses: [],
        },
      },
      answers: {
        _embedded: {
          postses: [],
        },
      },
      displayName: "",
      aboutMe: "",
      codeforces: "",
      codechef: "",
      github: "",
      links: [],
    };
  }

  componentDidMount() {
    console.log("The states from the history api are ", this.props.location.state);
    userService
      .getProfileData(this.props.location.state.getOwnerProfile)
      .then((response) => {
        this.setState({
          displayName: response.data.displayName,
          codechef: response.data.codechef,
          codeforces: response.data.codeforces,
          github: response.data.github,
          aboutMe: response.data.aboutMe,
          links: response.data._links,
        });
        questionService
          .getQuestionsByLink(this.state.links.userQuestions.href)
          .then((response) => {
            this.setState({
              questions: response.data,
              loaded: true,
            });
          });
        questionService
          .getQuestionsByLink(this.state.links.userAnswers.href)
          .then((response) => {
            this.setState({
              answers: response.data,
            });
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
    console.log("this.state.answers ", this.state.answers);
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
          right?
        </Popover.Content>
      </Popover>
    );

    return (
      <div className="App">
        <NavbarComponent history={this.props.history} />

        <Container>
          <Row id="sidedetails">
            <Col sm>
              <Row>
                <Col>
                  {" "}
                  <img
                    className="profile-image"
                    src="https://www.codechef.com/sites/default/files/uploads/pictures/0c81a144e3c9bf1c5e563a76ffcdc269.jpg"
                    alt="user pic"
                    width="200"
                    height="200"
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <h2>{this.state.displayName}</h2>
                </Col>
              </Row>

              <Row>
                <Col>
                  <p>{this.state.aboutMe}</p>
                </Col>
              </Row>

              <Row id="follow">
                <Col>Followers</Col>
                <Col>Following</Col>
              </Row>

              <Row id="followNumber">
                <Col>
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={popover}
                  >
                    <span variant="success">12</span>
                  </OverlayTrigger>
                </Col>
                <Col>8</Col>
              </Row>

              <Row id="links">
                <Col>
                  <a
                    href={
                      "https://www.codeforces.com/profile/" +
                      (this.state.codeforces === null
                        ? ""
                        : this.state.codeforces)
                    }
                  >
                    <Icon
                      className="icon"
                      icon={codeforcesIcon}
                      color="#FFFFFF"
                      width="30px"
                      height="30px"
                    />
                  </a>
                </Col>
                <Col>
                  {" "}
                  <a
                    href={
                      "https://www.github.com/" +
                      (this.state.codechef === null ? "" : this.state.codechef)
                    }
                  >
                    <Icon
                      className="icon"
                      icon={githubFill}
                      color="#FFFFFF"
                      width="30px"
                      height="30px"
                    />
                  </a>
                </Col>
                <Col>
                  <a
                    href={
                      "https://www.codechef.com/users/" +
                      (this.state.codechef === null ? "" : this.state.codechef)
                    }
                  >
                    <Icon
                      className="icon"
                      icon={codechefIcon}
                      color="#FFFFFF"
                      width="30px"
                      height="30px"
                    />
                  </a>
                </Col>
              </Row>

              <Row md="auto" id="followedit">
                <Col>
                  <Button variant="outline-primary" block>
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col xs={8} id="col2">
              <Tabs defaultActiveKey="myQuestions" id="profile-tab" fill>
                <Tab eventKey="myQuestions" title="User Questions">
                  <Col>
                    {this.state.questions._embedded !== undefined ? (
                      this.state.questions._embedded.postses.map((question) => (
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
                          previousPageLink={
                            this.state.questions._links.self.href
                          }
                          history={this.props.history}
                        />
                      ))
                    ) : (
                      <div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h3 style={{ color: "white" }}>
                          <strong>The user has not asked any questions.</strong>
                        </h3>
                      </div>
                    )}
                  </Col>
                </Tab>
                <Tab eventKey="myAnswers" title="User Answers">
                  {this.state.answers._embedded !== undefined &&
                  this.state.answers._embedded !== null &&
                  this.state.answers._embedded.length !== 0 &&
                  this.state.answers._embedded.singleQuestionAnswerWrappers !==
                    undefined ? (
                    this.state.answers._embedded.singleQuestionAnswerWrappers.map(
                      (wrapper) => {
                        console.log(
                          "wrapper.answer.body = ",
                          wrapper.answer.body
                        );
                        console.log(
                          "wrapper.question.body = ",
                          wrapper.question.body
                        );
                        return (
                          <QuestionAnswerComponent
                            history={this.props.history}
                            key={wrapper.answer.id}
                            question={wrapper.question.body}
                            qid={wrapper.question.id}
                            answer={wrapper.answer.body}
                            upvoteCount={wrapper.answer.upvoteCount}
                            ownerUserId={wrapper.question.ownerUserId}
                            links={wrapper._links}
                          />
                        );
                      }
                    )
                  ) : (
                    <div>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <h3 style={{ color: "white" }}>
                        <strong>
                          The user has not answered any questions.
                        </strong>
                      </h3>
                    </div>
                  )}
                </Tab>
              </Tabs>
            </Col>
            <Col id="col3"> </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePage;
