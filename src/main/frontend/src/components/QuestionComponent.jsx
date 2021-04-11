import React from "react";
import questionService from "../services/QuestionService";

class QuestionComponent extends React.Component {
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
    questionService.getQuestions().then((response) => {
      this.setState({
        questions: response.data,
        loaded: true,
      });
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Questions</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Owner Display Name</td>
              <td>Question</td>
              <td>Upvotes</td>
            </tr>
          </thead>
          <tbody>
            {this.state.questions._embedded.postses.map((question) => (
              <tr key={question.id}>
                <td>{question.ownerDisplayName}</td>
                <td>{question.body}</td>
                <td>{question.upvoteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default QuestionComponent;
