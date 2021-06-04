import React from "react";
import defaultPic from "../default_user_pic.png";
import "./MessageCard.css";

const MessageCard = ({ message, username, currentUser }) => {
  return (
    <div className={`card-wrapper ${currentUser ? "" : "different-user"}`}>
      <div className={`card-border ${currentUser ? "" : "card-right"}`}>
        <div className={`user-wrapper ${currentUser ? "" : "different-user"}`}>
          <span>{username || "Anonymous"}</span>
          <img src={defaultPic} alt="Default user" />
        </div>
        <div className={`message-wrapper ${currentUser ? "" : "float-right"}`}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
