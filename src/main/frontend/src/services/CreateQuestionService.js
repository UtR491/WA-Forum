import axios from 'axios';
const POST_QUESTION ="http://localhost:8080/api/posts/create/questions";

class CreateQuestionSerivce{
    constructor(){
        this.createQuestion=this.createQuestion.bind(this);
    }
    createQuestion(posts){
        console.log(posts)
        return axios.post(POST_QUESTION,{
            headers : {
                Authorization: "Bearer " + localStorage.getItem('jwt')
            }
        },JSON.stringify(posts))
    }
}
export default new CreateQuestionSerivce();