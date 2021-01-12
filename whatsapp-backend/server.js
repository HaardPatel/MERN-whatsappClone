//importing
const express = require("express");//server
const moongoose = require("mongoose");//DB
const Messages = require("./dbMessages.js");
const Pusher = require("pusher");// We are using Pusher in backend and Pusher-js in frontEnd
const cors = require("cors");

//Application config
const app = express(); //Create Application server
const port = process.env.PORT || 9000; //Set application PORT
const pusher = new Pusher({
  appId: "1118872",
  key: "9bf2f87ac189cb74bc71",
  secret: "11c913616d5a31bfafc5",
  cluster: "eu",
  useTLS: true,
});

//MiddleWare
app.use(express.json());

app.use(cors());//For the deploymet purpose.


//DB config
const connection_url =
  "mongodb+srv://admin:gONO7eJkbemvbPar@cluster0.m0slf.mongodb.net/whatsappdb?retryWrites=true&w=majority";

moongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Change stream  which will notify if the change occured in DB.
const db = moongoose.connection;
db.once("open", () => {
  console.log("DB CONNECTED");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();//mongoose change Stream

  changeStream.on("change", (change) => {
    console.log("CHNAGE OCCURED", change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;

      console.log("server => ", messageDetails);
      //message is channel name we subscibe and inserted is to which we bind our channel
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received:messageDetails.received
      });
    } else {
      console.log("ERROR TIGGER PUSHER...");
    }
  });
});

//API route
app.get("/", (req, res) => res.status(200).send("hello world"));

//Get all the Messages from the DB API 
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(data);
    } else {
      res.status(200).send(data);
    }
  });
});
//Create Message API
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(data);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log("Listening on Port:", port));
