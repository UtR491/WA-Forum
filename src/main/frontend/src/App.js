//import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
//import QuestionComponent from './components/QuestionComponent.jsx';
import HomePage from './components/HomePage';

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
    return (
      <div className="routes">
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={LoginComponent}/>
          <Route exact path={"/home"} component={HomePage}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
