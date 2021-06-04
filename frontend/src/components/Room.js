import React, { useState, useEffect, useRef } from "react";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "../service/socketService";
import { useLocation, useHistory } from "react-router-dom";
import MessageCard from "./MessageCard";
import "./Room.css";

const Room = ({ currentUsername }) => {
  const location = useLocation();
  const history = useHistory();

  const roomName = location.state.roomName;
  const chatBlockEl = useRef(null);
  const [messageLog, addMessageToLog] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (roomName) initiateSocket(roomName);

    subscribeToChat((err, data) => {
      if (err) return;
      addMessageToLog((msgs) => [...msgs, data]);
    });

    return () => {
      disconnectSocket();
    };
  }, [roomName]);

  useEffect(() => {
    if (chatBlockEl) {
      chatBlockEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div className="chat-room">
      <div className="room-header">
        <div>Room id {roomName}</div>
        <div>
          <button
            onClick={() => {
              disconnectSocket();
              history.push("/");
            }}
          >
            Leave Room
          </button>
        </div>
      </div>
      <div className="chat-block" ref={chatBlockEl}>
        {messageLog.map(({ message, username }) => {
          return (
            <MessageCard
              message={message}
              username={username}
              currentUser={username === currentUsername}
            />
          );
        })}
      </div>
      <div className="input-block">
        <input
          type="text"
          name="name"
          placeholder="Message input"
          value={inputMessage}
          onChange={({ target }) => setInputMessage(target.value)}
        />
        <button
          onClick={() => {
            sendMessage(roomName, inputMessage, currentUsername);
            setInputMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
