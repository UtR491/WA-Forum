import React from "react";
import { Redirect } from "react-router-dom";
import questionService from "../services/QuestionService";
import "./homestyle.css";
import QuestionCard from "./QuestionCard";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./editor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Row, Container, Col, Button, Modal } from "react-bootstrap";
import Footerpage from "./Footer";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.myProfile = this.myProfile.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
    this.setEditorState = this.setEditorState.bind(this);
    this.onQuestionChange = this.onQuestionChange.bind(this);

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
      editorState: EditorState.createEmpty(),
    };

    this.questionObject = {
      body: "",
      tags: [],
    };
    this.tagsString = "";
  }

  myProfile(event) {
    this.props.history.push("/profile/my", {
      //history: this.props.history
      getOwnerProfile: sessionStorage.getItem("getOwnerProfile"),
    });
  }

  sendAnswer(event) {
    console.log("this.state.editorState ==== ", this.state.editorState);
    if (this.state.editorState !== undefined) {
      const rawContentState = convertToRaw(
        this.state.editorState.getCurrentContent()
      );
      this.questionObject.body = draftToHtml(rawContentState, {
        trigger: "#",
        separator: " ",
      });
      if (this.questionObject.body.length > 0) {
        this.questionObject.tags =
          this.tagsString.length > 0
            ? this.tagsString.split(" ").filter((s) => s.length > 0)
            : [];
        console.log("tags are ", this.questionObject.tags);
        questionService
          .postQuestion(this.questionObject)
          .then((response) => {
            this.props.history.go(0);
          })
          .catch((error) => {
            this.props.history.go(0);
          });
      }
    }
  }

  onQuestionChange(event) {
    this.questionObject.body = event.target.value;
  }

  setEditorState(state) {
    this.setState({
      editorState: state,
    });
  }

  componentDidMount() {
    questionService.getQuestions().then((response) => {
      this.setState({
        questions: response.data,
        loaded: true,
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

    return (
      <div className="App">
        <NavbarComponent history={this.props.history} isHome={true} />
        <Modal
          id="quesModal"
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          animation={true}
          size="lg"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Have a Question?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Editor
                defaultEditorState={this.state.editorState}
                onEditorStateChange={this.setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  placeholder="Space separated list of tags..."
                  onChange={(event) => {
                    this.tagsString = event.target.value;
                  }}
                />
              </Form.Group>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Close
            </Button>

            <Button variant="primary" onClick={this.sendAnswer}>
              Ask
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          <Col></Col>
          <Col xs={8} id="col2">
            <Container
              onClick={() => this.setState({ show: true })}
              style={{ borderColor: "white", borderWidth: "10px" }}
            >
              <Form.Group id="haveaques">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Have a question? Ask here..."
                  size="lg"
                  readOnly
                  id="haveaques1"
                />
              </Form.Group>
            </Container>
            {this.state.questions._embedded.postses.map((question) => (
              <QuestionCard
                id={question.id}
                body={question.body}
                ownerUserId={question.ownerUserId}
                ownerDisplayName={question.ownerDisplayName}
                upvoteCount={question.upvoteCount}
                creationDate={question.creationDate}
                tags={question.tags}
                onAllAnswer={false}
                links={question._links}
                currentHasVoted={question.currentHasVoted}
                previousPageLink={this.state.questions._links.self.href}
                history={this.props.history}
              />
            ))}
          </Col>
          <Col style={{ margin: "0px" }}>
            {/* <button
              className="submitButton"
              onClick={() => this.setState({ show: true })}
            >
              Have A doubt
            </button> */}
          </Col>
        </Row>
        <Footerpage></Footerpage>
      </div>
    );
  }
}

export default HomePage;
