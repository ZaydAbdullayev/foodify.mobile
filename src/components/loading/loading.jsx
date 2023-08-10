import React from "react";
import "./loading.css";
import { useSelector } from "react-redux";
// import img from "../../components/assets/images/sandwich-run.gif";
import img from "./c4cb9abc7c69713e7e816e6a624ce7f8.gif";

export const Loading = () => {
  const loading = useSelector((state) => state.loading);
  return (
    <div className={loading ? "loading" : "close_loading"}>
      <img src={img} alt="" />
    </div>
  );
};
