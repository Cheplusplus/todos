import React, { useState } from "react";
import Content from "./Content";

const Container = () => {
  const [nightMode, setNightMode] = useState(false);

  return (
    <div
      className={"container" + (nightMode ? " night" : "")}
      style={nightMode ? { color: "#fafafa" } : { color: "#000" }}
    >
      {nightMode ? (
        <img src="/assets/bitmap.svg" className="bg-img" />
      ) : (
        <img src="/assets/bitmap1.svg" className="bg-img" />
      )}
      <Content nightMode={nightMode} setNightMode={setNightMode} />
    </div>
  );
};

export default Container;
