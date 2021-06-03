import React from "react";
import defaultPic from "../default_user_pic.png";
import "./MessageCard.css";

const MessageCard = ({ message, username }) => {
  return (
    <div className="card-wrapper">
      <div className="user-wrapper">
        <span>{username || "Anonymous"}</span>
        <img src={defaultPic} alt="Default user" />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default MessageCard;
