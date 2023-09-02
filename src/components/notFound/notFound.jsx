import "./notfound.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";

export const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.substring(0, 11);

  return (
    <div className="not_found_box">
      <span className="backword" onClick={() => navigate(location)}>
        <ImArrowLeft2 />
      </span>
      <div className="container">
        <div className="caption">
          <div className="hat-cont">
            <div className="lines"></div>
            <div className="hat"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="left-opp"></div>
          </div>
          <div className="head-text">Recipe Not Found !</div>
        </div>
        <div className="head">
          <div className="pan-wrapper">
            <div className="center">
              <div className="sub-center">
                <div className="egg">
                  <div className="yolk"></div>
                </div>
              </div>
              <div className="handle"></div>
            </div>
            <div className="handle-sub"></div>
          </div>
        </div>
        <Link to="/" className="btn_notfound">
          Bosh sahifaga qaytish{" "}
        </Link>
      </div>
    </div>
  );
};
