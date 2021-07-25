import "./App.css";
import React, { useContext } from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/messenger">
            <Messenger />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/">{user ? <Home /> : <Register />}</Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div``;
