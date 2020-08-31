import React from "react";
import "./Header.css";
import { auth } from "../firebase";

export default function Header(props) {
  return (
    <div className="Header">
      <h3>PURGERS CHAT</h3>
      {props.Authenticated !== "Pending" ? (
        <ul className="Links">
          {props.Authenticated ? (
            <>
              <li
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </li>
            </>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
