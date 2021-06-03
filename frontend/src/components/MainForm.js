import React from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

const MainForm = ({ username }) => {
  const socket = socketIOClient("http://localhost:8000");
  const history = useHistory();

  const joinRoom = (event) => {
    event.preventDefault();
    const room = event.target.roomId.value;
    socket.emit("join-room", room);
    history.push({
      pathname: "/room",
      state: {
        roomName: room,
      },
    });
  };

  const createRoom = (event) => {
    event.preventDefault();
    const roomName = event.target.roomName.value;
    history.push({
      pathname: "/room",
      state: {
        roomName,
      },
    });
  };

  return (
    <div>
      <div>hi {username}</div>
      <div>
        <p>Create new room</p>
        <form onSubmit={createRoom}>
          <label htmlFor="roomName">Room Name</label>
          <input type="text" name="roomName" />
          <br />
          <input type="submit" value="Create room" />
        </form>
      </div>
      <div>
        <p>or join an existing one</p>
      </div>
      <form onSubmit={joinRoom}>
        <label htmlFor="room-id">Room ID</label>
        <input type="text" name="roomId" />
        <br />
        <input type="submit" value="Join room" />
      </form>
    </div>
  );
};

export default MainForm;
