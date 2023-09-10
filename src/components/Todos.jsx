import React from "react";

const Todos = ({ nightMode }) => {
  return <div className={"todos" + (nightMode ? " night-todos" : "")}></div>;
};

export default Todos;
