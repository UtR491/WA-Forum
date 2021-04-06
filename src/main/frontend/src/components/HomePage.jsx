import React from "react";
// import ReactDOM from 'react-dom';
import "./homestyle.css";
import QuestionCard from "./QuestionCard";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Row, Container, Col, Button } from "react-bootstrap";

import questionService from "../services/QuestionService";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.myProfile = this.myProfile.bind(this);
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
  }

  myProfile(event) {
    this.props.history.push("/profile/my", {
      getOwnerProfile: this.props.getOwnerProfile,
      //history: this.props.history
    });
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
        <NavbarComponent history={this.props.history} isHome={true} />

        <Container>
          <Row>
            <Col md="auto" id="col1">
              <Container id="sideNav">
                <Col>
                  <Row>
                    <Button variant="outline-primary" onClick={this.myProfile}>
                      My Profile
                    </Button>
                  </Row>
                </Col>
              </Container>
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
