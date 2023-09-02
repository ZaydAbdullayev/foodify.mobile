import React, { useState, memo } from "react";
import "./home.css";
import { YMaps, Map, Placemark, Polyline } from "@pbe/react-yandex-maps";
import { ImArrowLeft2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import pin from "../../assets/img/black pin.png";
import { MdOutlineMyLocation } from "react-icons/md";

export const Home = memo(() => {
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const navigate = useNavigate();

  const center = clickedCoordinates?.length
    ? [...clickedCoordinates]
    : [41.002534933524345, 71.67760873138532];

  const handleMapClick = (e) => {
    const coordinates = e.get("coords");
    setClickedCoordinates(coordinates);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setClickedCoordinates([latitude, longitude]);

      window.navigator.vibrate(200);
    });
  };

  return (
    <YMaps>
      <div className="map_box">
        {/* My awesome application with maps!{" "}
        <span>{clickedCoordinates?.join(", ")}</span> */}
        <span className="backword" onClick={() => navigate("/")}>
          <ImArrowLeft2 />
        </span>
        <Map
          defaultState={{
            center: center,
            zoom: 17,
            controls: [],
          }}
          instanceRef={(ref) => {
            if (ref) {
              ref?.behaviors?.disable(["scrollZoom"]);
            }
          }}
          onClick={handleMapClick}
          className="map_item"
        >
          {clickedCoordinates && (
            <Placemark
              geometry={[...clickedCoordinates]}
              options={{
                iconLayout: "default#image",
                iconImageSize: [40, 40],
                iconImageHref: pin,
              }}
            />
          )}

          <Polyline
            geometry={[
              [40.96299228337921, 71.68732205954962],
              [40.96481401312289, 71.63891355124882],
              [40.98615050219515, 71.59908811179571],
              [41.00383890153776, 71.58363858786991],
              [41.01502174453666, 71.60698453513555],
              [41.02360262929261, 71.62140409079963],
              [41.026722671736955, 71.64818326560429],
              [41.03036253299224, 71.67667905417852],
              [41.015541830223775, 71.68869535056524],
              [41.006439733364445, 71.69933835593633],
              [40.99447505056397, 71.70483151999882],
              [40.97782489477923, 71.71204129783082],
              [40.96160154909337, 71.6880053606493],
              [40.96299228337921, 71.68732205954962],
            ]}
            options={{
              balloonCloseButton: false,
              strokeColor: "#000",
              strokeWidth: 4,
              strokeOpacity: 0.5,
            }}
          />
        </Map>
        <button onClick={getCurrentLocation}>
          <MdOutlineMyLocation />
        </button>
      </div>
    </YMaps>
  );
});
