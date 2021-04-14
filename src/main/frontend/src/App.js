import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginSignupHolder from "./components/LoginSignupHolder";
import HomePage from "./components/HomePage";
import AllAnswersComponent from "./components/AllAnswersComponent";
import ProfilePage from "./components/ProfilePage";
import EditMyProfile from "./components/EditMyProfile";
import SearchLandingPage from "./components/SearchLandingPage";

class App extends React.Component {
  render() {
    return (
      <div className="routes">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={LoginSignupHolder} />
            <Route exact path={"/home"} component={HomePage} />
            <Route exact path={"/profile/my"} component={ProfilePage} />
            <Route exact path={"/profile/my/edit"} component={EditMyProfile} />
            <Route path={"/posts/questions/"} component={AllAnswersComponent} />
            <Route path={"/profile/"} component={ProfilePage} />
            <Route exact path={"/home/search"} component={SearchLandingPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
