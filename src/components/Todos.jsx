//@ts-check
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuid } from "uuid";
//@ts-ignore
import TodoItem from "./TodoItem";
import {
  DndContext,
  closestCenter,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} message
 * @property {boolean} isComplete
 */

/**
 *
 * @param {string} message
 * @param {Todo[]} todos
 * @param {function} setTodos
 * @returns
 */
const addTodo = (message, todos, setTodos) => {
  /**
   * @type {Todo}
   */
  const newTodo = { id: uuid(), message: message, isComplete: false };
  setTodos([...todos, newTodo]);
  return [...todos, newTodo];
};

/**
 *
 * @param {Todo[]} todos
 * @param {function} setTodos
 */
const delCompletedTodos = (setTodos, todos) => {
  setTodos(todos.filter((todo) => todo.isComplete !== true));
};

/**
 *
 * @param {Todo} todo
 * @returns {true|false}
 */
const showActiveTodos = (todo) => (todo.isComplete === false ? true : false);
/**
 *
 * @param {Todo} todo
 * @returns {true|false}
 */
const showCompletedTodos = (todo) => (todo.isComplete === true ? true : false);
/**
 *
 * @param {Todo} todo
 * @returns {true|false}
 */

const showAllTodos = (todo) => true;

/**
 *
 * @param {Object} p
 * @param {boolean} p.nightMode
 * @returns
 */
const Todos = ({ nightMode }) => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [uiState, setUIState] = useState(() => showAllTodos);
  const [message, setMessage] = useState("");

  /**
   *
   * @param {string} id
   */
  const delTodo = (id) => {
    setTodos(todos.filter((/** @type {Todo} */ todo) => todo.id !== id));
  };

  /**
   *
   * @param {string} id
   */
  const updateCheckMark = (id) => {
    setTodos(
      todos.map((/** @type {Todo} */ todo) => {
        todo.id === id ? (todo.isComplete = !todo.isComplete) : null;
        return todo;
      })
    );
  };

  /**
   *
   * DND-Kit manager for when drag click ends
   */
  const onDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) return;
    setTodos((/** @type {Todo[]} */ todos) => {
      const oldIndex = todos.findIndex(
        (/** @type {Todo} */ todo) => todo.id === active.id
      );
      const newIndex = todos.findIndex(
        (/** @type {Todo} */ todo) => todo.id === over.id
      );
      return arrayMove(todos, oldIndex, newIndex);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div
      className={
        "todos" +
        (nightMode ? " night-todos box-shadow-dark" : " box-shadow-light")
      }
    >
      <div
        className={
          "flex-row todo-input-holder" + (nightMode ? " night-todos" : "")
        }
      >
        <img src="/assets/oval.svg" />
        <input
          type="text"
          style={
            nightMode
              ? { backgroundColor: "#25273D" }
              : { backgroundColor: "#FFFFFF" }
          }
          placeholder="Create a new todo..."
          maxLength={50}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo(message, todos, setTodos);
              setMessage("");
            }
          }}
        />
      </div>
      <div className="todo-list">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          sensors={sensors}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((/** @type {Todo} */ todo) =>
              uiState(todo) ? (
                <TodoItem
                  id={todo.id}
                  key={todo.id}
                  message={todo.message}
                  isComplete={todo.isComplete}
                  del={delTodo}
                  updateCheckMark={updateCheckMark}
                  nightMode={nightMode}
                />
              ) : null
            )}
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex-row filters">
        <p>
          {
            todos.filter(
              (/** @type {Todo} */ todo) => todo.isComplete === false
            ).length
          }{" "}
          items left
        </p>
        <div
          className="flex-row filter-controls"
          style={{ justifyContent: "center" }}
        >
          <p
            className="pointer"
            onClick={(e) => {
              setUIState(() => showAllTodos);
            }}
          >
            All
          </p>
          <p
            className="pointer"
            onClick={(e) => {
              setUIState(() => showActiveTodos);
            }}
          >
            Active
          </p>
          <p
            className="pointer"
            onClick={(e) => {
              setUIState(() => showCompletedTodos);
            }}
          >
            Completed
          </p>
        </div>
        <p
          className="pointer"
          onClick={(e) => {
            delCompletedTodos(setTodos, todos);
          }}
        >
          Clear Completed
        </p>
      </div>
      <p className="dnd-text">Drag and drop to reorder list</p>
    </div>
  );
};

export default Todos;
