import React from "react";
import { useHistory } from "react-router-dom";
import { setName } from "../service/userService";
import "./CreateUser.css";

const CreateUser = ({ setUsername }) => {
  const history = useHistory();
  const submitUsername = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    setUsername(username);
    setName(username);
    history.push("/");
  };

  return (
    <div className="wrapper">
      <p>Enter username</p>
      <form onSubmit={submitUsername}>
        <input type="text" name="username" placeholder="Username" />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default CreateUser;
