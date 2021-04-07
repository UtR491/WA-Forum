import axios from 'axios'

class CommentsService {
    constructor() {
        this.getCommentsForAnswer = this.getCommentsForAnswer.bind(this);
    }
    getCommentsForAnswer(link) {
        axios({
            url : link,
            method : "POST",
            headers: {
                Authorization : "Bearer " + localStorage.getItem('jwt')
            }
        })
    }
}

export default new CommentsService();