import React from "react";
import "./Profilestyle.css";
import QuestionCard from "./QuestionCard";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from "react-router-dom";
import {
  Row,
  Container,
  Col,
  Button,
  Tabs,
  Tab,
  OverlayTrigger,
  Popover,
  ListGroup,
  Modal,
} from "react-bootstrap";
import questionService from "../services/QuestionService";
import { Icon } from "@iconify/react";
import codechefIcon from "@iconify-icons/simple-icons/codechef";
import githubFill from "@iconify-icons/akar-icons/github-fill";
import codeforcesIcon from "@iconify-icons/simple-icons/codeforces";
import userService from "../services/UserService";
import QuestionAnswerComponent from "./QuestionAnswerComponent";
import ProfileService from "../services/ProfileService";
import UserService from "../services/UserService";
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
      followers: [],
      following: [],
      displayName: "",
      aboutMe: "",
      codeforces: "",
      codechef: "",
      github: "",
      links: [],
      followStatus: "YOU_DONT",
    };
    this.isItYou = false;
    this.getFollowers = this.getFollowers.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
    this.followToggle = this.followToggle.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToEditPage = this.goToEditPage.bind(this);
  }

  followToggle() {
    ProfileService.followUser(this.state.links.follow.href).then((response) => {
      if (this.state.followStatus === "YOU_DONT") {
        this.setState({
          followStatus: "YOU_FOLLOW",
        });
      } else {
        this.setState({
          followStatus: "YOU_DONT",
        });
      }
    });
  }

  goToEditPage() {
    this.props.history.push("/profile/my/edit");
  }

  componentDidMount() {
    userService
      .getProfileData(this.props.location.state.getOwnerProfile)
      .then((response) => {
        this.isItYou = response.data.itYou;
        this.setState({
          displayName: response.data.displayName,
          codechef: response.data.codechef,
          codeforces: response.data.codeforces,
          github: response.data.github,
          aboutMe: response.data.aboutMe,
          links: response.data._links,
          followStatus: response.data.followStatus,
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

  getFollowers() {
    UserService.getFollowers(this.state.links.getFollowers.href).then(
      (response) => {
        if (response.data._embedded !== undefined)
          this.setState({
            followers: response.data._embedded.followerses,
          });
      }
    );
  }

  getFollowing() {
    UserService.getFollowers(this.state.links.getFollowing.href).then(
      (response) => {
        if (response.data._embedded !== undefined)
          this.setState({
            followers: response.data._embedded.followings,
          });
      }
    );
  }

  goToProfile(event) {
    this.props.history.push("/profile/" + event.target.id, {
      getOwnerProfile: "http://localhost:8080/api/profile/" + event.target.id,
    });
    this.props.history.go(0);
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
    const following = (
      <Popover id="popover-basic">
        <Popover.Content>
          {this.state.following === undefined || this.state.following === [] ? (
            <text>
              <strong>The user does not follow anybody.</strong>
            </text>
          ) : (
            <ListGroup>
              {this.state.following.map((following) => {
                return (
                  <ListGroup.Item
                    className={following.followingId}
                    id={following.followingId}
                    onClick={this.goToProfile}
                  >
                    {following.name}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Popover.Content>
      </Popover>
    );
    const followers = (
      <Popover id="popover-basic">
        <Popover.Content>
          {this.state.followers === undefined || this.state.followers === [] ? (
            <text>
              <strong>The user has no followers.</strong>
            </text>
          ) : (
            <ListGroup>
              {this.state.followers.map((follower) => {
                return (
                  <ListGroup.Item
                    className={follower.followerId}
                    id={follower.followerId}
                    onClick={this.goToProfile}
                  >
                    {follower.name}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
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
                    src="https://icon-library.net/images/code-icon-png/code-icon-png-5.jpg"
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
              <Row id="followNumber">
                <Col onClick={this.getFollowers}>
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    onClick={this.getFollowing}
                    overlay={followers}
                  >
                    <text variant="success">
                      <strong>Followers</strong>
                    </text>
                  </OverlayTrigger>
                </Col>
                <Col>
                  <OverlayTrigger
                    trigger="click"
                    onClick={this.getFollowing}
                    placement="right"
                    overlay={following}
                  >
                    <text variant="success">
                      <strong>Following</strong>
                    </text>
                  </OverlayTrigger>
                </Col>
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
                      (this.state.github === null ? "" : this.state.github)
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
                  {this.isItYou ? (
                    <Button onClick={this.goToEditPage}>Edit Profile</Button>
                  ) : this.state.followStatus === "YOU_DONT" ? (
                    <Button
                      style={{ color: "white" }}
                      onClick={this.followToggle}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      style={{ color: "orange" }}
                      onClick={this.followToggle}
                    >
                      Unfollow
                    </Button>
                  )}
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
