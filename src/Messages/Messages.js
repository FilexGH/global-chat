import * as firebase from "firebase/app";
import "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import "./Messages.css";
import { auth, collection } from "../firebase";

export default function Messages() {
  const [Data, setData] = useState([]);
  const [Message, setMessage] = useState("");
  const messagesBox = useRef(null);
  let onChange = (e) => {
    setMessage(e.target.value);
  };
  let updateMessage = (res) => {
    let data = [];
    res.forEach((doc) => {
      data.push(
        <div className="message">
          <p className="Author">{doc.data().Author}</p>
          <div>{doc.data().Message}</div>
        </div>
      );
    });
    setData(data);
    messagesBox.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  let sendMessage = () => {
    if (Message !== "") {
      let sendMessage = Message;
      setMessage("");
      collection.add({
        ID: Data.length,
        Author: auth.currentUser.displayName,
        Message: sendMessage,
        Time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  useEffect(() => {
    let unsubscribe = collection
      .orderBy("Time", "asc")
      .onSnapshot((res) => updateMessage(res));
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="Messages">
      <div ref={messagesBox} className="StoredMessages">
        <h3>Start Chatting!</h3>
        {Data}
      </div>
      <div className="sendForm">
        <input
          onChange={onChange}
          placeholder="Place Message"
          value={Message}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
