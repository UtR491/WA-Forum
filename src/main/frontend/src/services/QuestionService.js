import axios from "axios";

const QUESTIONS_ENDPOINT = "http://localhost:8080/api/posts/questions"; 
const ASK_QUESTION_ENDPOINT = "http://localhost:8080/api/posts/create/questions";

class QuestionService {
  constructor() {
    this.getQuestions = this.getQuestions.bind(this);
  }

  getQuestions() {
    return axios.get(QUESTIONS_ENDPOINT, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }

  getQuestionsByLink(link) {
    return axios({
      url : link,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    })
  }

  postQuestion(question) {
    return axios({
      url : ASK_QUESTION_ENDPOINT,
      data: JSON.stringify(question),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    })
  }
}

export default new QuestionService();
