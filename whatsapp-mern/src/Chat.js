import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState } from "react";
import "./Chat.css";
import axios from 'axios'

function Chat({ messages }) {

  const [input, setInput] = useState("");
  const sendMessage = async (e) =>{
    e.preventDefault();

    await axios.post('/messages/new',{
      message:input,
      name:"DEMO APP",
      timestamp:"JUST NOW!!",
      received:false,
    });
    setInput("");
  };


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages?.map((messages) => (
          <p
            className={ " ${message.received} " ? "chat__message" : "chat__receiver"}
          >
            <span className="chat__name">{messages.name}</span>
            {messages.message}
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
          <button onClick={sendMessage} type="submit">
            Send a mesage
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
export default Chat;
