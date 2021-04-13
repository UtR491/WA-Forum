import React from "react";
// import ReactDOM from 'react-dom';
import "./questionstyle.css";
//import questionService from '../services/QuestionService';
import { Icon } from "@iconify/react";
import { Card, Row, Col, Container } from "react-bootstrap";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Tags from "./Tags";
import votingService from "../services/VotingService";
import bxUpvote from "@iconify-icons/bx/bx-upvote";
import bxDownvote from "@iconify-icons/bx/bx-downvote";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: "NOTHING",
      upvoteCount: 0,
    };
    this.questionClickedShowAnswers = this.questionClickedShowAnswers.bind(
      this
    );
    this.upvoteClicked = this.upvoteClicked.bind(this);
    this.downvoteClicked = this.downvoteClicked.bind(this);
    this.visitOwner = this.visitOwner.bind(this);
  }

  upvoteClicked() {
    if (this.state.vote === "UPVOTE") {
      votingService.removeVote(this.props.id).then(
        this.setState({
          vote: "NOTHING",
          upvoteCount: this.state.upvoteCount - 1,
        })
      );
    } else if (this.state.vote === "NOTHING") {
      votingService.addVote(1, this.props.id).then(
        this.setState({
          vote: "UPVOTE",
          upvoteCount: this.state.upvoteCount + 1,
        })
      );
    } else {
      votingService.addVote(1, this.props.id).then(
        this.setState({
          vote: "UPVOTE",
          upvoteCount: this.state.upvoteCount + 2,
        })
      );
    }
  }

  downvoteClicked() {
    if (this.state.vote === "DOWNVOTE") {
      votingService.removeVote(this.props.id).then(
        this.setState({
          vote: "NOTHING",
          upvoteCount: this.state.upvoteCount + 1,
        })
      );
    } else if (this.state.vote === "NOTHING") {
      votingService.addVote(-1, this.props.id).then(
        this.setState({
          vote: "DOWNVOTE",
          upvoteCount: this.state.upvoteCount - 1,
        })
      );
    } else {
      votingService.addVote(-1, this.props.id).then(
        this.setState({
          vote: "DOWNVOTE",
          upvoteCount: this.state.upvoteCount - 2,
        })
      );
    }
  }

  questionClickedShowAnswers(event) {
    this.props.history.push("/posts/questions/" + this.props.id + "/answers", {
      getAnswers: this.props.links.answers,
      ownerUserId: this.props.ownerUserId,
      ownerProfile: this.props.links.ownerProfile.href,
    });
  }

  visitOwner() {
    this.props.history.push("/profile/" + this.props.ownerUserId, {
      getAnswers: this.props.links.answers,
      ownerUserId: this.props.ownerUserId,
      getOwnerProfile: this.props.links.ownerProfile.href,
    });
  }

  componentDidMount() {
    this.setState({
      upvoteCount: this.props.upvoteCount,
      vote: this.props.currentHasVoted,
    });
  }

  render() {
    return (
      <div id="questioncard">
        <Container>
          <Card className="customCard" text={"white"}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div className="shadow-box-example z-depth-1-half">
              <Card.Body id="cardbody">
                <Row>
                  <Col className="votingColumn" xs={1}>
                    <Row>
                      <Col>
                        <Icon
                          icon={bxUpvote}
                          color={
                            this.state.vote === "UPVOTE"
                              ? "green"
                              : "currentColor"
                          }
                          height="20"
                          width="20"
                          className="bi bi-arrow-up-circle-fill upvote"
                          onClick={this.upvoteClicked}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong id="upvoteCount">{this.state.upvoteCount}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Icon
                          icon={bxDownvote}
                          color={
                            this.state.vote === "DOWNVOTE"
                              ? "red"
                              : "currentColor"
                          }
                          height="20"
                          width="20"
                          className="bi bi-arrow-down-circle-fill downvote"
                          onClick={this.downvoteClicked}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      onClick={this.questionClickedShowAnswers}
                      style={{
                        textAlign: "left",
                        marginTop: "-1px",
                        marginBottom: "10px",
                        marginLeft: "-20px",
                      }}
                    >
                      <Col>
                        {" "}
                        <Card.Subtitle>
                          <div
                            className="clickable-paragraph"
                            onClick={this.questionClickedShowAnswers}
                            color="white"
                            style={{whiteSpace: "pre-wrap"}}
                          >
                            {this.props.body}
                          </div>
                        </Card.Subtitle>
                      </Col>
                    </Row>
                    <Tags tags={this.props.tags} />

                    <hr />
                    <Row>
                      <Col md="auto">
                        <div>
                          <img
                            className="asker"
                            src="https://upload.wikimedia.org/wikipedia/en/a/a1/NafSadh_Profile.jpg"
                            alt="user pic"
                            width="25"
                            height="25"
                          />
                          <text style={{ color: "white" }}>
                            {" "}
                            Asked by -{" "}
                            <strong
                              className="answererName"
                              onClick={this.visitOwner}
                            >
                              {this.props.ownerDisplayName}
                            </strong>
                          </text>
                        </div>
                      </Col>

                      <Col padding="3px">
                        Posted On - {this.props.creationDate.substring(0, 10)}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
}

// ReactDOM.render(<App/>, document.getElementById("root"));

export default QuestionCard;
