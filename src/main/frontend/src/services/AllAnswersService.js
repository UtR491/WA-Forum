import axios from 'axios'

class AllAnswersService {
  constructor() {
    this.getAllAnswersForAQuestion = this.getAllAnswersForAQuestion.bind(this);
  }
  getAllAnswersForAQuestion(link) {
    return axios({
      url: link,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  }
}

export default new AllAnswersService();