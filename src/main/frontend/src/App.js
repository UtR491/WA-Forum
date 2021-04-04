import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent';
import QuestionComponent from './components/QuestionComponent.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onScreen: "login",
    };
    this.changeScreenState = this.changeScreenState.bind(this);
  }

  changeScreenState(newScreen) {
    this.setState({
      onScreen : newScreen
    });
  }

  render() {
    if (this.state.onScreen === "login") {
      return (
        <div className="App">
          <LoginComponent changeScreen={this.changeScreenState}/>
        </div>
      );
    } else if(this.state.onScreen === "questions") {
      return (
        <div className="App">
          <QuestionComponent changeScreen={this.changeScreenState}/>
        </div>
      );
    }
  }
}

export default App;
