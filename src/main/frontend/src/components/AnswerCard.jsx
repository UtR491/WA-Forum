import React from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
} from "react-bootstrap";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import votingService from "../services/VotingService";
import commentsService from "../services/CommentsService";
import profileService from "../services/ProfileService";

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: "NOTHING",
      upvoteCount: 0,
      comments: [],
      typedComment : "",
    };
    this.upvoteClicked = this.upvoteClicked.bind(this);
    this.downvoteClicked = this.downvoteClicked.bind(this);
    this.commentClicked = this.commentClicked.bind(this);
    this.visitOwner = this.visitOwner.bind(this);
    this.sendingComment = this.sendingComment.bind(this);
    this.commentInput = this.commentInput.bind(this);
  }

  upvoteClicked() {
    console.log("upvote clicked");
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
    console.log("downvote clicked");
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
          console.log(response);
          this.setState({
            comments: response.data.comments._embedded.commentses,
          });
        });
    } else {
      this.setState({
        comments: [],
      });
    }
  }

  visitOwner() {
    console.log("answerer name clicked");
    this.props.history.push("/profile/" + this.props.ownerUserId);
  }

  sendingComment(event) {
    console.log("The event is event ", event)
    console.log("sending comment written as ", this.state.typedComment);
    if(this.state.typedComment.length > 0) {
      commentsService.sendCommentToAnswer({body : this.state.typedComment}, this.props.links.postComment.href).then((response) => {
        console.log(response);
        if(response.status === 201) {
          console.log("This is the history object ", this.props.history);
          this.props.history.go(0);
        }
      })
    }
  }

  commentInput(event) {
    this.setState({
      typedComment: event.target.value
    })
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={
                      this.state.vote === "UPVOTE" ? "green" : "currentColor"
                    }
                    className="bi bi-arrow-up-circle-fill upvote"
                    viewBox="0 0 16 16"
                    onClick={this.upvoteClicked}
                  >
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                  </svg>
                  <br />
                  <strong>{this.state.upvoteCount}</strong>
                  <br />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={
                      this.state.vote === "DOWNVOTE" ? "red" : "currentColor"
                    }
                    className="bi bi-arrow-down-circle-fill downvote"
                    viewBox="0 0 16 16"
                    onClick={this.downvoteClicked}
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg>
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
                        <p
                          onClick={this.questionClickedShowAnswers}
                          color="white"
                        >
                          {this.props.body}
                        </p>
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
                      <Col xs={2}>
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
                    </Row>
                  </Card.Header>
                  {this.state.comments.map((comment) => (
                    <Accordion.Collapse eventKey="0">
                      <Card.Body style={{ color: "black" }}>
                        {comment.body}
                      </Card.Body>
                    </Accordion.Collapse>
                  ))}
                  <Card.Footer style={{ padding: "0px" }}>
                    <Row style={{padding : "0px"}}>
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
                      <Col md="auto"><text> </text></Col>
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
