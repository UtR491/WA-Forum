import axios from 'axios';

const QUESTIONS_ENDPOINT = "http://localhost:8080/api/posts/questions"; 

class QuestionService {
    
    constructor() {
        this.getQuestions = this.getQuestions.bind(this);
    }

    getQuestions() {
        return axios.get(QUESTIONS_ENDPOINT, {
            headers : {
                Authorization: "Bearer " + localStorage.getItem('jwt')
            }
        });
    }
}

export default new QuestionService();