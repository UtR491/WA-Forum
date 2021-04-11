import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import LoginSignupHolder from "./components/LoginSignupHolder"
import HomePage from "./components/HomePage";
import AllAnswersComponent from "./components/AllAnswersComponent";
import ProfilePage from "./components/ProfilePage";
import EditMyProfile from "./components/EditMyProfile";
import Chat from "./components/Chat/chat/Chat";

class App extends React.Component {

  render() {
    return (
      <div className="routes">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={LoginSignupHolder} />
            <Route exact path={"/home"} component={HomePage}/>
            <Route exact path={"/profile/my"} component={ProfilePage} />
            <Route exact path={"/profile/my/edit"} component={EditMyProfile}/>
            <Route path={"/posts/questions/"} component={AllAnswersComponent} />
            <Route path={"/profile/"} component={ProfilePage} />
            <Route exact path="/chat" render={(props) => <Chat {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
