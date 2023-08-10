import React from "react";
import "./modal.css";
import { useSelector, useDispatch } from "react-redux";
import { acCloseModal } from "../../redux/modal";
import { Link } from "react-router-dom";

import default_img from "../assets/images/default-img.png";

export const Modal = () => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const user = JSON?.parse(localStorage.getItem("customer")) || [];

  const closeModal = () => {
    dispatch(acCloseModal());
  };

  const log_out = () => {
    localStorage.removeItem("customer");
    window.location.reload();
  };

  return (
    <div
      className={modal ? "modal_container" : "modal_container close_modal"}
      onClick={closeModal}
    >
      <div className="modal_box">
        <div className="user">
          <b>{user?.users?.username}</b>
          <figure>
            <img src={default_img} alt="user_photo" />
            <button onClick={closeModal}>x</button>
          </figure>
        </div>
        <ul>
          <Link to="/my/profil">Mening profilim</Link>
          <Link to="/my/favourite">Mening yoqtirganlarim</Link>
          <Link to="/my/orders">Buyurtlarim</Link>
          <Link to="/">Bildirishnomalar</Link>
          <li onClick={log_out}>Chiqish</li>
        </ul>
      </div>
    </div>
  );
};
