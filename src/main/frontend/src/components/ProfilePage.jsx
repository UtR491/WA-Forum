import React from "react";
// import ReactDOM from 'react-dom';
import "./Profilestyle.css";
import QuestionCard from "./QuestionCard";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Row, Container, Col, Button } from "react-bootstrap";

import questionService from "../services/QuestionService";
import SideNavPage from "./SideNavigation";

import { Icon, InlineIcon } from "@iconify/react";
import codechefIcon from "@iconify-icons/simple-icons/codechef";

import githubFill from "@iconify-icons/akar-icons/github-fill";

import codeforcesIcon from "@iconify-icons/simple-icons/codeforces";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {
        _embedded: {
          postses: [],
        },
      },
    };
  }

  componentDidMount() {
    console.log("Question service = ", questionService);
    questionService.getQuestions().then((response) => {
      console.log("The response was ", response);
      console.log("Resopnse.data = ", response.data);
      this.setState({
        questions: response.data,
        loaded: true,
      });
      console.log("Question service = ", this.state.questions);
    });
  }

  render() {
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
                  <h2>Darpan Mittal</h2>
                </Col>
              </Row>

              <Row>
                <Col>
                  <p>
                    Hello there!I am a Second year Undergraduate in MNNIT
                    Allahabad.
                  </p>
                </Col>
              </Row>

              <Row id="follow">
                <Col>Followers</Col>
                <Col>Following</Col>
              </Row>

              <Row id="followNumber">
                <Col>12</Col>
                <Col>8</Col>
              </Row>

              <Row id="links">
                <Col>
                  <Icon
                    icon={codeforcesIcon}
                    color="#FFFFFF"
                    width="30px"
                    height="30px"
                  />
                </Col>
                <Col>
                  {" "}
                  <Icon
                    icon={githubFill}
                    color="#FFFFFF"
                    width="30px"
                    height="30px"
                  />
                </Col>
                <Col>
                  <Icon
                    icon={codechefIcon}
                    color="#FFFFFF"
                    width="30px"
                    height="30px"
                  />
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
            <Col id="col3"> </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePage;
