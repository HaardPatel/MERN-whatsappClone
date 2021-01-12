import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "axios";

//We are using import-js in the frontend so "npm i psuher-js" is to install psuher-js and we are use Pusher in backend.
function App() {
  const [messages, setMessages] = useState([]);

  //This useEffect is going to fetch all the data intially
  useEffect(() => {
    axios.get("http://localhost:9000/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  //When we attach any kind of listner we don't want to attach it serval times.
  useEffect(() => {
    const pusher = new Pusher("9bf2f87ac189cb74bc71", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      // alert(JSON.stringify(dat));
      setMessages([...messages, data]); 
    });
    //Cleanup Function
    // return () => {
    //   channel.unbind_all();
    //   channel.unsubscribe();
    // }
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}
export default App;
