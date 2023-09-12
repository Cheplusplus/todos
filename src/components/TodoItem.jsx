//@ts-check
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoItem = ({
  id,
  message,
  isComplete,
  del,
  updateCheckMark,
  nightMode,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="todo flex-row pointer"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={Object.assign(
        style,
        nightMode
          ? { borderBottom: "1px solid #393A4B" }
          : { borderBottom: "1px solid #9495A5" }
      )}
    >
      {isComplete ? (
        <img
          src="/assets/group-41.png"
          className="checkMark"
          onClick={() => updateCheckMark(id)}
        />
      ) : (
        <img
          src="/assets/oval.svg"
          className="checkMark"
          onClick={() => updateCheckMark(id)}
        />
      )}
      <p className="message flex-3">{message}</p>
      <p
        className="close-icon"
        style={mouseOver ? { display: "block" } : { display: "none" }}
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
