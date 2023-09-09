import React, { useState } from "react";
import "./message.css";
import io from "socket.io-client";

const socket = io("http://localhost:5005");

export const Message = (props) => {
  const [open, setOpen] = useState(false);

  socket.on("/get/message", (data) => setOpen(data));

  return (
    <div className={open ? "message_body open" : "message_body"}>
      <div className="message_content">
        <p>Buyurtmangiz qabul qilindi !</p>
      </div>
      <button onClick={() => setOpen(false)}>Ok</button>
    </div>
  );
};

// function notifyMe() {
//   if (!("Notification" in window)) {
//     // Check if the browser supports notifications
//     alert("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//     // Check whether notification permissions have already been granted;
//     // if so, create a notification
//     const notification = new Notification("Hi there!");
//     // …
//   } else if (Notification.permission !== "denied") {
//     // We need to ask the user for permission
//     Notification.requestPermission().then((permission) => {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         const notification = new Notification("Hi there!");
//         // …
//       }
//     });
//   }

// At last, if the user has denied notifications, and you
// want to be respectful there is no need to bother them anymore.

// <button onclick="notifyMe()">Notify me!</button>;
