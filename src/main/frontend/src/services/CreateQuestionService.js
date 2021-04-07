import axios from 'axios';
const POST_QUESTION ="http://localhost:8080/api/posts/create/questions";

class CreateQuestionSerivce{
    constructor(){
        this.createQuestion=this.createQuestion.bind(this);
    }
    createQuestion(posts){
        console.log(posts)
        return axios({
            url: POST_QUESTION,
            data: JSON.stringify(posts),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
          });
    }
}
export default new CreateQuestionSerivce();