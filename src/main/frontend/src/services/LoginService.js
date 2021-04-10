import axios from "axios";

const LOGIN_URL = "http://localhost:8080/api/login";
const SIGNUP_URL = "http://localhost:8080/api/signup";

class LoginService {
  constructor() {
    this.loginAndGetJwt = this.loginAndGetJwt.bind(this);
    this.signup = this.signup.bind(this);
  }

  loginAndGetJwt(creds) {
    return axios({
      url: LOGIN_URL,
      data: JSON.stringify(creds),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  signup(deets) {
    return axios({
      url: SIGNUP_URL,
      data: JSON.stringify(deets),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new LoginService();
