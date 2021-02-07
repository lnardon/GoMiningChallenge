import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.scss";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/Dashboard";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/dashboard">
        <DashboardPage />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
