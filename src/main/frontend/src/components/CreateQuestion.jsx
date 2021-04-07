import { DragHandle } from "@material-ui/icons";
import { Button } from "antd";
import React, { Component } from "react";
import CreateQuestionService from "../services/CreateQuestionService";
import TextEditor from "./TextEditor";
class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      tags: [],
    };
    this.setBody = this.setBody.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
  }
  setBody(body) {
    this.setState({ body: body });
  }
  askQuestion(event) {
    console.log(this.state);
    if (this.state.body.length !==0)
      CreateQuestionService.createQuestion(this.state).then((response) =>{
        this.props.history.push("/home");
      });
  }
  render() {
    return (
      <div>
        <Button value="submit" text="submit" onClick={this.askQuestion} />
        <TextEditor onChange={this.setBody} />
      </div>
    );
  }
}

export default CreateQuestion;
