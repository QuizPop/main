import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import RegisterAsPlatform from "./components/auth/PlatformRegister";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import quiz from "./components/quiz/quiz";
import myprofile from "./components/quiz/myprofile";
import quizCreate from "./components/quiz/Quiz-Create";
import quizEdit from "./components/quiz/Quiz-Edit";
import platform from "./components/platform/platform-create";
import plats from "./components/platform/platform";
//import platformCreate from "./components/platform/Platform-Create";
import leaderboards from "./components/leaderboards/leaderboard";
import platformList from "./components/platform/Platform-List";
import quizList from "./components/quiz/Quiz-List";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/platform-register"
              component={RegisterAsPlatform}
            />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/quizlist" component={quizList} />
              <PrivateRoute exact path="/myprofile" component={myprofile} />
              <PrivateRoute
                exact
                path="/quiz-create"
                platformOnly={true}
                component={quizCreate}
              />
              <PrivateRoute
                exact
                path="/quiz-edit/:id"
                platformOnly={true}
                component={quizEdit}
              />
              <PrivateRoute exact path="/quiz-list" component={quizList} />
              <PrivateRoute
                exact
                path="/platform-create"
                platformOnly={true}
                component={platform}
              />
              <PrivateRoute
                exact
                path="/platform-list"
                component={platformList}
              />
              <PrivateRoute
                exact
                path="/leaderboard"
                component={leaderboards}
              />
              <PrivateRoute exact path="/quiz/:id" component={quiz} />
              <PrivateRoute exact path="/platforms/:id" component={plats} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;