import React from "react";
import { useHistory } from "react-router-dom";
import { setName } from "../service/userService";

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
    <div>
      <p>Enter username</p>
      <form onSubmit={submitUsername}>
        <input type="text" name="username" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateUser;
