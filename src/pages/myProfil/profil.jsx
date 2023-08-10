import React, { useEffect, useState } from "react";
import "./profil.css";
import { ApiGetService, ApiUpdateService } from "../../services/api.service";
import { NumericFormat } from "react-number-format";

export const MyProfil = () => {
  const id = JSON.parse(localStorage.getItem("customer")).id || null;
  const [users, setUser] = useState([]);

  const phone = users?.phone?.split("+")[1];

  useEffect(() => {
    ApiGetService.fetching(`get/user/${id}`)
      .then((res) => {
        setUser(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    ApiUpdateService.fetching(`update/user/${id}`)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="my_profil">
      <div>
        <div>
          <div className="my_account">
            <div>
              <h1>My Account</h1>
              <p>Account Orders</p>
            </div>
            <hr />
          </div>
          <div className="profil_card">
            <div>
              <p>Start Your Order</p>
              <form>
                <section>
                  <span>Username</span>
                  <input
                    placeholder="Name..."
                    type="text"
                    defaultValue={users?.username}
                  />
                </section>
                <section>
                  <span>Password</span>
                  <input
                    placeholder="******"
                    type="password"
                    defaultValue={users?.password}
                  />
                </section>
                <section>
                  <span>phone</span>
                  <NumericFormat
                    value={phone}
                    name="phone"
                    prefix="+"
                    allowLeadingZeros
                    thousandSeparator=" "
                  />
                </section>
                <section>
                  <span>food</span>
                  <input placeholder="777" type="number" />
                </section>
              </form>
              <button>Find Food</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
