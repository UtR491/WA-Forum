import axios from "axios";

const QUESTIONS_ENDPOINT = "http://localhost:8080/api/posts/questions"; 
const ASK_QUESTION_ENDPOINT = "http://localhost:8080/api/posts/create/questions";
const ELASTIC_SEARCH_BODY_ENDPOINT="http://localhost:8080/api/search/posts/searchBody/"
const ELASTIC_SEARCH_NAME_ENDPOINT="http://localhost:8080/api/search/posts/"
const SEARCH_BY_TAGS_ENDPOINT="http://localhost:8080/api/posts/questions?tags="

class QuestionService {
  constructor() {
    this.getQuestions = this.getQuestions.bind(this);
    this.elasticSearchByBody=this.elasticSearchByBody.bind(this);
    this.elasticSearchByName=this.elasticSearchByName.bind(this);
  }
  elasticSearchByName(name){
    return axios.get(ELASTIC_SEARCH_NAME_ENDPOINT+name,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    })
  }
  elasticSearchByBody(body){
    return axios.get(ELASTIC_SEARCH_BODY_ENDPOINT+body,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    })
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

  searchByTags(tags) {
    return axios({
      url : SEARCH_BY_TAGS_ENDPOINT+tags,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    })
  }
}

export default new QuestionService();
