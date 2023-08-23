import React, { memo, useState, useEffect } from "react";
import "./map.css";
import { useDispatch } from "react-redux";
import { acLocation } from "../../redux/location";

export const MapBox = memo(() => {
  const [location, setLocation] = useState();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(
      "Manzilingiz aniqlanmoqda iltimos aniqlash jarayonida internet yoki GPS ni o'chirmang..."
    );
    navigator.geolocation.getCurrentPosition(oldu, olmadi);
  }, []);

  const oldu = (pos) => {
    setMessage(
      "Manzilingiz aniqlandi! Agarda topilgan manzil xato bo'lsa sahifani yangilang va qaytadan urinib ko'ring"
    );
    setLocation(
      `https://www.google.com/maps/place/${pos?.coords?.latitude},${pos?.coords?.longitude}`
    );
    
  };

  function olmadi(hata) {
    setMessage(`
    <strong>Locatsiyada xatoligi</strong> ${hata.code} <br>
    <strong>Iltimos sahifani yangilang va qaytadan urinib ko'ring</strong> ${hata.message}
    `);
  }

  return (
    <div className="map_box">
      <div className="map_container">
        <p id="durum_mesaj">{message}</p>
        <iframe
          id="harita"
          src={location}
          title="find location"
          allowFullScreen="off"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
});
