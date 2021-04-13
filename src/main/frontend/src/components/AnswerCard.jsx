import React from "react";
import { Accordion, Button, Card, Col, Row, Form } from "react-bootstrap";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import votingService from "../services/VotingService";
import bxUpvote from "@iconify-icons/bx/bx-upvote";
import "./LoginSignupHolderStyling.css";
import { Icon } from "@iconify/react";
import bxDownvote from "@iconify-icons/bx/bx-downvote";
import commentsService from "../services/CommentsService";
import AllAnswersService from "../services/AllAnswersService";

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.state = {
      vote: "NOTHING",
      upvoteCount: 0,
      comments: [],
      typedComment: "",
    };
    this.upvoteClicked = this.upvoteClicked.bind(this);
    this.downvoteClicked = this.downvoteClicked.bind(this);
    this.commentClicked = this.commentClicked.bind(this);
    this.visitOwner = this.visitOwner.bind(this);
    this.sendingComment = this.sendingComment.bind(this);
    this.commentInput = this.commentInput.bind(this);
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

  commentClicked() {
    if (this.state.comments === undefined || this.state.comments.length === 0) {
      commentsService
        .getCommentsForAnswer(this.props.links.getComments.href)
        .then((response) => {
          if (response.data.comments._embedded !== undefined) {
            this.setState({
              comments: response.data.comments._embedded.commentses,
            });
          }
        });
    } else {
      this.setState({
        comments: [],
      });
    }
  }

  visitOwner() {
    this.props.history.push("/profile/" + this.props.ownerUserId, {
      getAnswers: this.props.links.answers,
      ownerUserId: this.props.ownerUserId,
      getOwnerProfile: this.props.links.ownerProfile.href,
    });
  }

  sendingComment(event) {
    if (this.state.typedComment.length > 0) {
      commentsService
        .sendCommentToAnswer(
          { body: this.state.typedComment },
          this.props.links.postComment.href
        )
        .then((response) => {
          if (response.status === 201) {
            this.props.history.go(0);
          }
        });
    }
  }

  acceptAnswer() {
    AllAnswersService.acceptAnswer(
      this.props.acceptAnswerLink,
      this.props.id
    ).then((response) => {
      this.props.history.go(0);
    });
  }

  commentInput(event) {
    this.setState({
      typedComment: event.target.value,
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
        <Card className="customCard" text={"white"}>
          <div className="shadow-box-example z-depth-1-half">
            <Card.Body id="cardbody">
              <Row>
                <Col className="votingColumn" xs={1}>
                  <Row>
                    <Col>
                      {this.props.accepted ? (
                        <img
                          width="20px"
                          src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyLjA2MyA1MTIuMDYzIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMi4wNjMgNTEyLjA2MyIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48Zz48ZWxsaXBzZSBjeD0iMjU2LjAzMiIgY3k9IjI1Ni4wMzIiIGZpbGw9IiMwMGRmNzYiIHJ4PSIyNTUuOTQ5IiByeT0iMjU2LjAzMiIvPjwvZz48cGF0aCBkPSJtMjU2LjAzMiAwYy0uMTE2IDAtLjIzMS4wMDQtLjM0Ny4wMDR2NTEyLjA1NWMuMTE2IDAgLjIzMS4wMDQuMzQ3LjAwNCAxNDEuMzU3IDAgMjU1Ljk0OS0xMTQuNjI5IDI1NS45NDktMjU2LjAzMnMtMTE0LjU5Mi0yNTYuMDMxLTI1NS45NDktMjU2LjAzMXoiIGZpbGw9IiMwMGFiNWUiLz48cGF0aCBkPSJtMTExLjMyNiAyNjEuMTE4IDEwMy41MjQgMTAzLjUyNGM0LjUxNSA0LjUxNSAxMS44MzYgNC41MTUgMTYuMzUxIDBsMTY5Ljk1Ny0xNjkuOTU3YzQuNTE1LTQuNTE1IDQuNTE1LTExLjgzNiAwLTE2LjM1MWwtMzAuOTM1LTMwLjkzNWMtNC41MTUtNC41MTUtMTEuODM2LTQuNTE1LTE2LjM1MSAwbC0xMjMuNjE3IDEyMy42MTVjLTQuNTE1IDQuNTE1LTExLjgzNiA0LjUxNS0xNi4zNTEgMGwtNTUuMzk3LTU1LjM5N2MtNC40MjYtNC40MjYtMTEuNTcxLTQuNTI2LTE2LjExOS0uMjI2bC0zMC44MyAyOS4xNDljLTQuNzMyIDQuNDc1LTQuODM3IDExLjk3My0uMjMyIDE2LjU3OHoiIGZpbGw9IiNmZmY1ZjUiLz48cGF0aCBkPSJtMzcwLjIyMyAxNDcuMzk4Yy00LjUxNS00LjUxNS0xMS44MzYtNC41MTUtMTYuMzUxIDBsLTk4LjE4NyA5OC4xODd2OTQuNTczbDE0NS40NzMtMTQ1LjQ3M2M0LjUxNS00LjUxNSA0LjUxNS0xMS44MzYgMC0xNi4zNTJ6IiBmaWxsPSIjZGZlYmYxIi8+PC9nPjwvc3ZnPg=="
                          alt="idk"
                        />
                      ) : (
                        <br />
                      )}
                    </Col>
                  </Row>
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
                      <Row>
                        <Col>
                          <strong id="upvoteCount">
                            {this.state.upvoteCount}
                          </strong>
                        </Col>
                      </Row>
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
                          onClick={this.questionClickedShowAnswers}
                          color="white"
                          style={{ whiteSpace: "pre-wrap" }}
                          dangerouslySetInnerHTML={{ __html: this.props.body }}
                        />
                      </Card.Subtitle>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer style={{ padding: "0px" }}>
              <Accordion style={{ padding: "0px" }}>
                <Card style={{ padding: "0px" }}>
                  <Card.Header style={{ padding: "0px" }}>
                    <Row>
                      <Col md="auto">
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                          style={{ padding: "1%" }}
                        >
                          <text>
                            <strong>
                              {" " + this.props.commentCount + " "}
                            </strong>
                          </text>
                          <ChatBubbleOutlineOutlinedIcon
                            onClick={this.commentClicked}
                          />
                        </Accordion.Toggle>
                      </Col>
                      <Col>
                        <div style={{ padding: "3px" }}>
                          <img
                            className="asker"
                            src="https://upload.wikimedia.org/wikipedia/en/a/a1/NafSadh_Profile.jpg"
                            alt="user pic"
                            width="25"
                            height="25"
                          />
                          <text style={{ color: "black" }}>
                            {" "}
                            Answered by -{" "}
                            <strong
                              className="answererName"
                              onClick={this.visitOwner}
                            >
                              {this.props.ownerDisplayName}
                            </strong>
                          </text>
                        </div>
                      </Col>
                      <Col
                        padding="3px"
                        style={{ color: "black", padding: "3px" }}
                      >
                        Answered On - {this.props.creationDate.substring(0, 10)}
                      </Col>
                      <Col>
                        {this.props.showAcceptButton ? (
                          <button
                            className="submitButton"
                            onClick={this.acceptAnswer}
                          >
                            Accept Answer
                          </button>
                        ) : (
                          <br />
                        )}
                      </Col>
                    </Row>
                  </Card.Header>
                  {this.state.comments.map((comment) => (
                    <Accordion.Collapse eventKey="0">
                      <Card.Body style={{ color: "black" }}>
                        <span>{comment.body + " - "}</span>{" "}
                        <strong>{comment.userDisplayName}</strong>
                      </Card.Body>
                    </Accordion.Collapse>
                  ))}
                  <Card.Footer style={{ padding: "0px" }}>
                    <Row style={{ padding: "0px" }}>
                      <Col>
                        <Form.Group
                          controlId="exampleForm.ControlTextarea1"
                          style={{ margin: "0px" }}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Your comment here..."
                            onChange={this.commentInput}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="auto" onClick={this.sendingComment}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="black"
                          className="bi bi-chevron-double-right"
                          viewBox="0 -2 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </Col>
                      <Col md="auto">
                        <text> </text>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Accordion>
            </Card.Footer>
          </div>
        </Card>
      </div>
    );
  }
}

export default AnswerCard;
