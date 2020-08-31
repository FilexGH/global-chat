import React, { useState } from "react";
import { auth } from "../firebase";
import "./Login.css";

export default function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [WrongCred, setWrongCred] = useState(false);
  let onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  let updateDisplayName = (user) => {
    let name = prompt("What is your name ?");
    if (name === "") {
      name = "Random" + Math.floor(Math.random() * 1001);
    }
    user.user.updateProfile({
      displayName: name,
    });
  };
  let login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((user) => updateDisplayName(user))
      .catch((error) => setWrongCred(true));
  };
  return (
    <div className="Container">
      <form className="MainForm">
        {WrongCred ? (
          <p className="Wrong">Please check your email or password.</p>
        ) : null}
        <div>
          <label for="email">Email</label>
          <input
            onChange={onChange}
            autoComplete="off"
            value={Email}
            name="email"
            type="email"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            onChange={onChange}
            autoComplete="off"
            name="password"
            type="password"
          />
        </div>
        <input
          className="SubmitButton"
          type="submit"
          onClick={login}
          value="Login In"
        />
      </form>
    </div>
  );
}
