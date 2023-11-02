import React, { useState, memo } from "react";
import "./mapbox.css";
import { YMaps, Map, Placemark, Polyline } from "@pbe/react-yandex-maps";
import { ImArrowLeft2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useLocationAddMutation } from "../../services/user.service";
import { enqueueSnackbar as es } from "notistack";
import { LoadingBtn } from "../loading/loading";

import pin from "../assets/images/black pin.png";
import { MdOutlineMyLocation } from "react-icons/md";

export const LocationMap = memo(() => {
  const currentCoords = JSON.parse(localStorage.getItem("coords"));
  const user = JSON.parse(localStorage.getItem("customer")) || [];
  const [locationAdd] = useLocationAddMutation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const center = currentCoords || [41.002534933524345, 71.67760873138532];
  const [clickedCoordinates, setClickedCoordinates] = useState(
    currentCoords || null
  );
  const navigate = useNavigate();

  const handleMapClick = (e) => {
    const coordinates = e.get("coords");
    setClickedCoordinates(coordinates);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem("coords", JSON.stringify([latitude, longitude]));
    });
    window.location.reload();
  };

  const addLoaction = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);
    console.log(value);

    try {
      setLoading(true);
      const { data } = await locationAdd(value);
      if (data) {
        es("Lokatsiya qo'shildi", { variant: "success" });
        e.target.reset();
        setOpen(false);
        navigate("/");
        localStorage.setItem("coords", JSON.stringify(clickedCoordinates));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YMaps>
      <div className="map_container">
        <span
          className="backword"
          onClick={() => navigate("/")}
          style={{ color: "#333" }}
        >
          <ImArrowLeft2 />
        </span>
        <Map
          defaultState={{
            center: center,
            zoom: 17,
            controls: [],
          }}
          onClick={handleMapClick}
          className="map_container__map"
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
        <div className="geolocation">
          <button onClick={() => setOpen(true)}>Lokatsiyani tasdiqlash</button>
          <button onClick={getCurrentLocation}>
            <MdOutlineMyLocation />
          </button>
        </div>
      </div>
      <div className={open ? "confirm_location open" : "confirm_location"}>
        {open && (
          <form className="location_box" onSubmit={addLoaction}>
            <p>Lokatsiya tasdiqlash</p>
            <input
              type="text"
              name="name"
              required
              placeholder="Lokatsiya uchun nom kiriting"
              autoComplete="off"
              autoFocus
            />
            <input
              type="hidden"
              name="latitude"
              value={clickedCoordinates[0]}
              required
            />
            <input
              type="hidden"
              name="longitude"
              value={clickedCoordinates[1]}
              required
            />
            <input
              type="hidden"
              name="user_id"
              value={user?.users?.id}
              required
            />
            <button id="addCoord">
              {loading ? <LoadingBtn /> : "Tasdiqlash"}
            </button>
          </form>
        )}
        <i onClick={() => setOpen(false)}></i>
      </div>
    </YMaps>
  );
});
