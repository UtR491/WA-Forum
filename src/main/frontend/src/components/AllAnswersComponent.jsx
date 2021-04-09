import React from "react";
import { Col, Row } from "react-bootstrap";
import allAnswersService from "../services/AllAnswersService";
import NavbarComponent from "./NavbarComponent";
import AnswerCard from "./AnswerCard";
import "./AnswerStyle.css";

class AllAnswersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
    this.onAskerClick = this.onAskerClick.bind(this);
  }

  onAskerClick(event) {
    console.log("asker has been clicked upon");
    console.log("ayopppp ", this.props.location.state);
    console.log(
      "The link to get the profile of the user is ",
      localStorage.getItem("getOwnerProfile")
    );
    this.props.history.push(
      "/profile/" + this.props.location.state.ownerUserId,
      { getOwnerProfile: this.props.location.state.ownerProfile }
    );
  }

  componentDidMount() {
    console.log(
      "The link to get answers is ",
      this.props.location.state.getAnswers.href
    );
    allAnswersService
      .getAllAnswersForAQuestion(this.props.location.state.getAnswers.href)
      .then((response) => {
        console.log("answers for the question are ", response);
        this.setState({ answers: response });
      });
  }

  render() {
    console.log("Inside render of all answers component");
    if (this.state.answers === undefined || this.state.answers.length === 0) {
      return <h1>There are no answers for this question.</h1>;
    } else {
      return (
        <div>
          <NavbarComponent history={this.props.history} />
          <br />
          <Row>
            <Col></Col>
            <Col xs={7}>
              <div>
                <div
                  style={{ color: "white" }}
                  dangerouslySetInnerHTML={{
                    __html: this.state.answers.data.question.body,
                  }}
                ></div>
                <p style={{ color: "white" }}>
                  {" "}
                  - Asked By{""}
                  <strong className="asker" onClick={this.onAskerClick}>
                    Darpan Mittal
                  </strong>
                </p>
                <br />
                <div>
                  {this.state.answers.data.answers.map((answer) => (
                    <AnswerCard
                      body={answer.body}
                      id={answer.id}
                      upvoteCount={answer.upvoteCount}
                      currentHasVoted={answer.currentHasVoted}
                    />
                  ))}
                </div>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </div>
      );
    }
  }
}

export default AllAnswersComponent;
