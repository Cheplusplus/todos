import React from "react";
import completed from "../assets/Group 4(1).png";
import notCompleted from "../assets/Group 4.png";

const Todo = ({ message, isComplete, add, del }) => {
  return (
    <div className="todo flex-row">
      {isComplete ? (
        <img src={completed} className="checkMark" />
      ) : (
        <img src={notCompleted} className="checkMark" />
      )}
      <p>{message}</p>
    </div>
  );
};

export default Todo;
