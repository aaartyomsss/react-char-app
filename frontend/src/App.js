import React, { useEffect, useState } from "react";
import MainForm from "./components/MainForm";
import Room from "./components/Room";
import CreateUser from "./components/CreateUser";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getName } from "./service/userService";

const App = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = getName();
    if (getUsername) setUsername(getUsername);
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/room">
            <Room username={username} />
          </Route>

          <Route path="/create-user">
            <CreateUser setUsername={setUsername} />
          </Route>

          <Route path="/">
            {username ? (
              <MainForm username={username} />
            ) : (
              <Redirect to="/create-user" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
