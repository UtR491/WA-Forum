import React from "react";
import loginService from "../services/LoginService";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationNumber: "",
      password: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    loginService.loginAndGetJwt(this.state).then((response) => {
      console.log(response);
      this.props.changeScreen('questions');
    });
  }

  render() {
    return (
      <div>
        <h1>Login to get answers from simps</h1>
        <form>
          <input
            type="text"
            name="registrationNumber"
            onChange={this.handleInput}
          />
          <br />
          <input type="password" name="password" onChange={this.handleInput} />
          <br />
          <input
            type="button"
            name="loginButton"
            onClick={this.handleSubmit}
            value="Login"
          />
        </form>
      </div>
    );
  }
}

export default LoginComponent;
