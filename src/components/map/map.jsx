import React, { memo, useState, useEffect } from "react";
import "./map.css";

export const Map = memo(() => {
  const [location, setLocation] = useState();
  useEffect(() => {
    document.getElementById("durum_mesaj").innerHTML = `Konum sorgulanıyor...`;
    navigator.geolocation.getCurrentPosition(oldu, olmadi);
  });

  const oldu = (pos) => {
    document.getElementById("enlem").innerHTML = pos.coords.latitude;
    document.getElementById("boylam").innerHTML = pos.coords.longitude;
    document.getElementById(
      "dogruluk"
    ).innerHTML = `${pos.coords.accuracy} metre`;

    document.getElementById("durum_mesaj").innerHTML = `Konum sonucu bulundu`;
    setLocation(
      `https://www.google.com/maps?output=embed&z=15&q=${pos.coords.latitude},${pos.coords.longitude}`
    );

    document.getElementById("harita").setAttribute("src", location);

    console.log(pos.coords);
  };

  function olmadi(hata) {
    document.getElementById("durum_mesaj").innerHTML = `
    <strong>Hata Kodu</strong> ${hata.code} <br>
    <strong>Hata mesajı</strong> ${hata.message}
    `;

    console.log(hata);
  }

  // https://www.google.com/maps/dir/40.2444958,70.3400734/40.9919616,71.6827157/40.2994958,70.2400734

  return (
    <div className="map">
      <div className="esas">
        <p>
          <strong>Enlem:</strong> <span id="enlem">-</span>
        </p>
        <p>
          <strong>Boylam:</strong> <span id="boylam">-</span>
        </p>
        <p>
          <strong>Doğruluk:</strong> <span id="dogruluk">-</span>
        </p>

        {/* <iframe
          id="harita"
          title="yol tarifi"
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d12044.657228843478!2d71.64101290607886!3d40.999776786085334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x38bb4bfc001a5dbd%3A0x40a244bc191925c0!2sAlisher%20Navoi%20Street%2C%20Namangan!3m2!1d40.992427!2d71.6618659!4m5!1s0x38bb4b36c13a943d%3A0xc823450731b8a6c6!2sChorsu%2C%20Namangan!3m2!1d41.005746099999996!2d71.6435589!5e0!3m2!1str!2s!4v1690372398006!5m2!1str!2s"
          width="600"
          height="450"
          allowFullScreen="off"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}

        <iframe
          id="harita"
          title="cordinate"
          src={location}
          width="100%"
          height="450"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>

        {/* <button onClick={konumSorgula}>Konumu bul</button> */}
      </div>

      <div className="kutucuk">
        <p id="durum_mesaj">Beklemede</p>
      </div>
    </div>
  );
});
