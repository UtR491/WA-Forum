import React from "react";
import { Card, Container } from "react-bootstrap";
import "./questionstyle.css";

class QuestionAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
    this.questionClicked = this.questionClicked.bind(this);
  }

  questionClicked() {
    this.props.history.push("/posts/questions/" + this.props.qid + "/answers", {
      getAnswers: this.props.links.allAnswers,
      ownerUserId: this.props.ownerUserId,
      ownerProfile: this.props.links.ownerProfile,
    });
  }

  render() {
    return (
      <Container style={{ margin: "30px" }}>
        <Card className="customCard" id="wrapperanswer">
          <Card.Body>
            <Card.Title
              className="clickable-paragraph"
              onClick={this.questionClicked}
              style={{
                color: "white",
                whiteSpace: "pre-wrap",
                textAlight: "left",
              }}
            >
              {this.props.question}
            </Card.Title>
            <hr />
            <Card.Text
              style={{
                color: "white",
                alignContent: "flexStart",
                whiteSpace: "pre-wrap",
                textAlign: "left",
              }}
            >
              {this.props.answer}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default QuestionAnswerComponent;
