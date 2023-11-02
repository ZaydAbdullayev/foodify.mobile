import React, { useState } from "react";
import "./message.css";
import io from "socket.io-client";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://lncxlmks-80.inc1.devtunnels.ms");

export const Message = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON?.parse(localStorage?.getItem("customer")) || [];
  const id = user?.users?.id;

  socket.on(`/get/message/${id}`, (data) => {
    setOpen(data.status);
    setMessage(data.variant);
    socket.off(`/get/message/${id}`);
  });

  return (
    <div
      className={open ? "message_body open" : "message_body"}
      style={message === 6 ? { background: "#ffa62b" } : {}}
    >
      <div className="message_content">
        {message === 1 ? (
          <p>Buyurtmangiz qabul qilindi !</p>
        ) : message === 6 ? (
          <p>
            Buyurtmangiz bekor qilindi. Noqulayliklar uchun uzur so'raymiz !
          </p>
        ) : message === 3 ? (
          <p>Xurmatli mijoy buyurtmangiz tayyor va sizga yetkazilmoqda !</p>
        ) : (
          <p>
            Buyurtma yetib keldi iltimos qabul qilib oling. Foodify jamoasi
            nomidan Yoqimli ishtaha !
          </p>
        )}
      </div>
      <button
        onClick={() => setOpen(false)}
        style={message === 6 ? { color: "#ffa62b" } : {}}
      >
        Ok
      </button>
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
// }
// {
//   /* <button onclick="notifyMe()">Notify me!</button>; */
// }
