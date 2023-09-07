import React, { useState } from "react";
import "./payment.css";
import { PatternFormat } from "react-number-format";

const bankImages = {
  humo: require("../components/assets/images/humo.jpg"),
  visa: require("../components/assets/images/Visa_Inc.-Logo.wine.png"),
  click: require("../components/assets/images/Click-01.png"),
  mastercard: require("../components/assets/images/Mastercard-Logo.wine.png"),
  uzum: require("../components/assets/images/UZUM_BANK-01.png"),
  payme: require("../components/assets/images/payme-01.png"),
  uzcard: require("../components/assets/images/Uzcard_Logo-700x367.png"),
};

export const PaymentPay = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [bg, setBg] = useState("");
  return (
    <div className="payment_pay_section">
      <div className="payment_postcard">
        <div className="payment_header" onClick={() => setOpen(false)}>
          <div
            className={active === 1 ? "payment_item active" : "payment_item"}
            onClick={() => setActive(1)}
          >
            <img src={bankImages.humo} alt="bank" />
            <img src={bankImages.uzcard} alt="bank" />
            <p>Sum cards (0%)</p>
          </div>
          <div
            className={active === 2 ? "payment_item active" : "payment_item"}
            onClick={() => setActive(2)}
          >
            <img src={bankImages.visa} alt="bank" />
            <img src={bankImages.mastercard} alt="bank" />
            <p>Sum cards (0%)</p>
          </div>
          <div
            className={active === 3 ? "payment_item active" : "payment_item"}
            onClick={() => setActive(3)}
          >
            <img src={bankImages.payme} alt="bank" />
            <img src={bankImages.click} alt="bank" />
            <img src={bankImages.uzum} alt="bank" />
            <p>Sum cards (0%)</p>
          </div>
        </div>

        {active === 1 ? (
          <form
            className="payment_body2"
            style={{
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="add_card" onClick={() => setOpen(true)}>
              ADD card +
            </div>
            <div
              className={
                bg === "9"
                  ? "card_item humo"
                  : bg === "4"
                  ? "card_item visa"
                  : bg === "8"
                  ? "card_item uzcard"
                  : "card_item"
              }
              style={open ? { top: "50%" } : {}}
            >
              <PatternFormat
                format="#### #### #### ####"
                displayType="input"
                name="card_name"
                required
                autoComplete="off"
                placeholder="Karta raqami"
                onChange={(e) => setBg(e.target.value.substring(0, 1))}
              />
              <PatternFormat
                format="##/##"
                displayType="input"
                name="card_month"
                required
                placeholder="Amal qiladigan muddati"
                autoComplete="off"
              />
              <button className="payment_btn">To'lash</button>
            </div>
          </form>
        ) : active === 2 ? (
          ""
        ) : (
          <div className="payment_body2">
            <figure className="app_item">
              <img src={bankImages.click} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
            <figure className="app_item">
              <img src={bankImages.payme} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
            <figure className="app_item">
              <img src={bankImages.uzum} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
            <figure className="app_item">
              <img src={bankImages.click} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
          </div>
        )}
      </div>
    </div>
  );
};
