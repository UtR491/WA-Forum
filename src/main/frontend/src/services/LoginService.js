import axios from "axios";

const LOGIN_URL = "http://localhost:8080/api/login"

class LoginService {

    constructor() {
        this.loginAndGetJwt = this.loginAndGetJwt.bind(this);
    }

    loginAndGetJwt(creds) {
        console.log("credentials entered are ", creds);
        return axios({
            url : LOGIN_URL,
            data : JSON.stringify(creds),
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
            }
        });
    }

}

export default new LoginService();