import axios from 'axios'

class CommentsService {
    constructor() {
        this.getCommentsForAnswer = this.getCommentsForAnswer.bind(this);
        this.sendCommentToAnswer = this.sendCommentToAnswer.bind(this);
    }
    getCommentsForAnswer(link) {
        return axios({
            url : link,
            method : "GET",
            headers: {
                Authorization : "Bearer " + sessionStorage.getItem('jwt'),
            }
        })
    }
    sendCommentToAnswer(comment, link) {
        return axios({
            url: link,
            method: "POST",
            data: JSON.stringify(comment),
            headers: {
                Authorization : "Bearer " + sessionStorage.getItem('jwt'),
                "Content-Type": "application/json",
            }
        })
    }
}

export default new CommentsService();