import React, { useState } from "react";
import bitmapDay from "../assets/Bitmap(1).svg";
import bitmapNight from "../assets/Bitmap.svg";
import Content from "./Content";

const Container = () => {
  const [nightMode, setNightMode] = useState(false);

  return (
    <div className={"container" + (nightMode ? " night" : "")}>
      {nightMode ? (
        <img src={bitmapNight} className="bg-img" />
      ) : (
        <img src={bitmapDay} className="bg-img" />
      )}
      <Content nightMode={nightMode} setNightMode={setNightMode} />
    </div>
  );
};

export default Container;
