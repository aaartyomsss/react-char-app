import React, { useState, useEffect } from "react";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "../service/socketService";
import { useLocation, useHistory } from "react-router-dom";
import MessageCard from "./MessageCard";

const Room = ({ username }) => {
  const location = useLocation();
  const history = useHistory();

  const roomName = location.state.roomName;
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

  return (
    <div>
      <div>Room id {roomName}</div>
      <div>
        {messageLog.map(({ message, username }) => {
          return <MessageCard message={message} username={username} />;
        })}
      </div>
      <div>
        <input
          type="text"
          name="name"
          value={inputMessage}
          onChange={({ target }) => setInputMessage(target.value)}
        />
        <button
          onClick={() => {
            sendMessage(roomName, inputMessage, username);
            setInputMessage("");
          }}
        >
          Send
        </button>
      </div>
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
  );
};

export default Room;
