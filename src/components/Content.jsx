import React from "react";
import nightModeLogoDay from "../assets/Combined Shape.svg";
import nightModeLogoNight from "../assets/Combined Shape(1).svg";
import Todos from "./Todos";

const toggleNightMode = (nightMode, setNightMode) => {
  setNightMode(!nightMode);
};

const Content = ({ nightMode, setNightMode }) => {
  return (
    <div className={"content"}>
      <div className="flex-row todos-header">
        <h1>TODO</h1>
        {nightMode ? (
          <img
            src={nightModeLogoNight}
            className="nightmode-logo pointer"
            onClick={() => toggleNightMode(nightMode, setNightMode)}
          />
        ) : (
          <img
            src={nightModeLogoDay}
            className="nightmode-logo pointer"
            onClick={() => toggleNightMode(nightMode, setNightMode)}
          />
        )}
      </div>
      <Todos nightMode={nightMode} />
    </div>
  );
};

export default Content;
