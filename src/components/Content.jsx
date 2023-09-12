import React from "react";
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
            src="/assets/combined-shape1.svg"
            className="nightmode-logo pointer"
            onClick={() => toggleNightMode(nightMode, setNightMode)}
          />
        ) : (
          <img
            src="/assets/combined-shape.svg"
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
