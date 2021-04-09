import React from "react";
import { Col, Row } from "react-bootstrap";
import allAnswersService from "../services/AllAnswersService";
import NavbarComponent from "./NavbarComponent";
import {Redirect} from "react-router-dom"
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
      this.props.location.state.getAskerProfile.href
    );
    this.props.history.push(
      "/profile/" + this.props.location.state.ownerUserId
    );
  }

  componentDidMount() {
    allAnswersService
      .getAllAnswersForAQuestion(this.props.location.state.getAnswers.href)
      .then((response) => {
        console.log("answers for the question are ", response);
        this.setState({ answers: response });
      });
  }

  render() {
    console.log("Inside render of all answers component");
    if(localStorage.getItem("jwt") === null) {
      console.log("so it is undefined");
      return <Redirect to={{
        pathname : "/",
        state: {
          redirected : true
        }
      }}/>;
    }

    if (this.state.answers === undefined || this.state.answers.length === 0) {
      return <h1><strong>There are no answers for this question.</strong></h1>;
    } else {
      return (
        <div>
          <NavbarComponent history={this.props.history}/>
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
                      ownerDisplayName={answer.ownerDisplayName}
                      commentCount={answer.commentCount}
                      ownerUserId={answer.ownerUserId}
                      links={answer._links}
                      creationDate={answer.creationDate}
                      history={this.props.history}
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
