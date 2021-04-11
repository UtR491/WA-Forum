import axios from 'axios'

class AllAnswersService {
  constructor() {
    this.getAllAnswersForAQuestion = this.getAllAnswersForAQuestion.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
  }
  getAllAnswersForAQuestion(link) {
    return axios({
      url: link,
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }

  sendAnswer(link, answer) {
    return axios({
      url: link,
      method: "POST",
      data: JSON.stringify(answer),
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }

  acceptAnswer(link, answerId) {
    return axios({
      url: link,
      method: "POST",
      data: JSON.stringify(answerId),
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }
}

export default new AllAnswersService();