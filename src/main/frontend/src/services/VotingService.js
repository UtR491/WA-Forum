import axios from "axios";

const ADD_VOTE_URL = "http://localhost:8080/api/vote/add";
const REMOVE_VOTE_URL = "http://localhost:8080/api/vote/remove";

class VotingService {
  constructor() {
    this.addVote = this.addVote.bind(this);
    this.removeVote = this.removeVote.bind(this);
  }

  addVote(type, postId) {
    return axios({
      url: ADD_VOTE_URL,
      data: {
        userId: sessionStorage.getItem("userId"),
        postId: postId,
        typeOf: type,
      },
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }

  removeVote(postId) {
    return axios({
      url: REMOVE_VOTE_URL,
      data: {
        userId: sessionStorage.getItem("userId"),
        postId: postId,
      },
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }
}

export default new VotingService();
