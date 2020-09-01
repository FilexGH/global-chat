import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import { auth } from "../firebase";
import Login from "../Login/Login";
import Messages from "../Messages/Messages";

function App() {
  const [Authenticated, setAuthenticated] = useState("Pending");
  auth.onAuthStateChanged((user) => setAuthenticated(user));
  return (
    <div className="App">
      <Header Authenticated={Authenticated} />
      {Authenticated === null ? <Login /> : null}
      {Authenticated !== "Pending" && Authenticated !== null ? (
        <Messages />
      ) : null}
    </div>
  );
}

export default App;
