import React, { useState } from "react";
import "./login.css";
import { PatternFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { HiUser } from "react-icons/hi";
import { ApiService } from "../../services/api.service";
import { enqueueSnackbar } from "notistack";
import icon from "./logo.png";
import { BiSolidLockAlt, BiSolidPhone } from "react-icons/bi";
import { ImArrowLeft2 } from "react-icons/im";

export const Signin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [pass, setPass] = useState({});
  const [err, setErr] = useState(false);
  const { pass1, pass2 } = pass;

  const handleShow = () => {
    setShow(!show);
  };

  const closeModal = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData.entries());
    value.phone = value?.phone?.split(" ")?.join("");
    if (pass1 === pass2) {
      await ApiService.fetching("register/user", value)
        .then((res) => {
          const msg =
            "Foydalanuvchi hisobi yaratildi. Iltimos ilovadan foydalanish qaytadan hisobga kiring";
          enqueueSnackbar(msg, { variant: "success" });
          navigate("/login");
        })
        .catch((err) => {
          setErr(false);
          const msg = "Bu username allaqachon mavjud!!!";
          enqueueSnackbar(msg, { variant: "warning" });
        });
    }
  };

  return (
    <div className="login_container">
      <span onClick={closeModal}>
        <ImArrowLeft2 />
      </span>
      <div className="login">
        <figure className="icon_box">
          <img src={icon} alt="icons" />
          <h1>Foodify</h1>
        </figure>
        <form className="login_body" onSubmit={handleSubmit}>
          <label>
            <i>
              <HiUser />
            </i>
            <input
              type="text"
              name="username"
              placeholder="Foydalanuvchi ismi"
              required
              autoComplete="off"
              autoCapitalize="off"
              style={err ? { border: "2px solid tomato", color: "tomato" } : {}}
            />
          </label>
          <label>
            <i>
              <BiSolidPhone />
            </i>
            <PatternFormat
              format="+998 ## ### ## ##"
              allowEmptyFormatting
              required
              name="phone"
              mask="_"
            />
          </label>
          <label>
            <i>
              <BiSolidLockAlt />
            </i>
            <input
              type={show ? "password" : "text"}
              name="password"
              placeholder="Parol kiriting"
              required
              autoComplete="off"
              id="fpass"
              onChange={(e) => setPass({ ...pass, pass1: e.target.value })}
            />
            <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </label>
          <label
            style={
              pass1 !== pass2
                ? { border: "2px solid tomato", color: "tomato" }
                : {}
            }
          >
            <i>
              <BiSolidLockAlt />
            </i>
            <input
              type={show ? "password" : "text"}
              name="password"
              placeholder="Parolni takrorlang"
              required
              autoComplete="off"
              id="spass"
              onChange={(e) => setPass({ ...pass, pass2: e.target.value })}
            />
            <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </label>
          <button>Ro'yxatdan o'tish</button>
          <span>
            Hisobingiz mavjudmi? <Link to="/login">Hisobga kirish</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [err, setErr] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const closeModal = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData.entries());
    await ApiService.fetching("login/users", value)
      .then((res) => {
        const user = res?.data?.innerData?.users;
        localStorage.setItem("customer", JSON.stringify(user));
        const msg = "Hisobga muvoffaqiyatli kirildi!!!";
        enqueueSnackbar(msg, { variant: "success" });
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        const msg =
          "Foydalanuvch yoki parolda xatolik bor iltimos qaytadan urinib ko'ring! ";
        enqueueSnackbar(msg, { variant: "warning" });
        setErr(true);
      });
  };

  return (
    <div className="login_container">
      <span onClick={closeModal}>
        <ImArrowLeft2 />
      </span>
      <div className="login">
        <figure className="icon_box">
          <img src={icon} alt="icons" />
          <h1>Foodify</h1>
        </figure>
        <form className="login_body" onSubmit={handleSubmit}>
          <label
            style={err ? { border: "2px solid tomato", color: "tomato" } : {}}
          >
            <i>
              <HiUser />
            </i>
            <input
              type="text"
              name="username"
              placeholder={err ? err : "Foydalanuvchi ismi"}
              required
              autoComplete="off"
              autoCapitalize="off"
            />
          </label>
          <label
            style={err ? { border: "2px solid tomato", color: "tomato" } : {}}
          >
            <i>
              <BiSolidLockAlt />
            </i>
            <input
              type={show ? "password" : "text"}
              name="password"
              placeholder="Parol kiriting"
              required
              autoComplete="off"
              id="spass"
            />
            <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
              {show ? <BsEyeSlash /> : <BsEye />}
            </span>
          </label>
          <button>Kirish</button>
          <Link to="/">Parolingizni unutdingizmi?</Link>
          <span>
            Hisobingiz yo'qmi? <Link to="/signin">Hisob ochish</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
