import React from "react";
import completed from "../assets/Group 4(1).png";
import notCompleted from "../assets/Oval.svg";

const TodoItem = ({ id, message, isComplete, del, updateCheckMark }) => {
  const onClickCheckMark = (id) => {
    updateCheckMark(id);
  };

  return (
    <div className="todo flex-row">
      {isComplete ? (
        <img
          src={completed}
          className="checkMark"
          onClick={() => onClickCheckMark(id)}
        />
      ) : (
        <img
          src={notCompleted}
          className="checkMark"
          onClick={() => onClickCheckMark(id)}
        />
      )}
      <p>{message}</p>
      <p
        onClick={() => {
          del(id);
        }}
      >
        ╳
      </p>
    </div>
  );
};

export default TodoItem;
