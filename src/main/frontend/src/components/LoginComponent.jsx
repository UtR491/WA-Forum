import React from "react";
//import { Redirect } from "react-router";
import loginService from "../services/LoginService";
import {Form} from 'react-bootstrap'

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
      console.log('JWT received ', response.data.jwt.jwt);
      localStorage.setItem('jwt', response.data.jwt.jwt);
      this.props.history.push("/home")
    });
  }

  render() {
    return (
      <div>
        <h1>Login to get answers from simps</h1>
        <Form>
        <Form.Label>Registration number</Form.Label>
          <Form.Control
            type="text"
            name="registrationNumber"
            placeholder="Enter your Registration number"
            onChange={this.handleInput}
          />
          <br />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={this.handleInput} />
          <br />
          <input
            type="button"
            name="loginButton"
            onClick={this.handleSubmit}
            value="Login"
          />
        </Form>
      </div>
    );
  }
}

export default LoginComponent;
