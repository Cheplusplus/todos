//@ts-check
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TodoItem from "./TodoItem";

/**
 * @typedef {Object} Todo
 * @property {number} id
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
  const newTodo = { id: todos.length, message: message, isComplete: false };
  setTodos([...todos, newTodo]);
  return [...todos, newTodo];
};

/**
 *
 * @param {Todo[]} todos
 * @param {function} setTodos
 * @returns {Todo[]|[]}
 */
const delCompletedTodos = (setTodos, todos) => {
  const newTodos = todos.filter((todo) => todo.isComplete !== true);
  setTodos(newTodos);
  return newTodos;
};

/**
 *
 * @param {function} setUITodos
 * @param {Todo[]} todos
 */
const showActiveTodos = (setUITodos, todos, setUIState) => {
  setUITodos(todos.filter((todo) => todo.isComplete === false));
  setUIState(() => showActiveTodos);
};

/**
 *
 * @param {function} setUITodos
 * @param {Todo[]} todos
 */
const showCompletedTodos = (setUITodos, todos, setUIState) => {
  setUITodos(todos.filter((todo) => todo.isComplete === true));
  setUIState(() => showCompletedTodos);
};

/**
 *
 * @param {function} setUITodos
 * @param {Todo[]} todos
 */
const showAllTodos = (setUITodos, todos, setUIState) => {
  setUITodos(todos);
  setUIState(() => showAllTodos);
};

/**
 *
 * @param {Object} p
 * @param {boolean} p.nightMode
 * @returns
 */
const Todos = ({ nightMode }) => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [uiTodos, setUITodos] = useState([]);
  const [uiState, setUIState] = useState(() => showAllTodos);
  const [message, setMessage] = useState("");

  /**
   *
   * @param {number} id
   */
  const delTodo = (id) => {
    setTodos(todos.filter((/** @type {Todo} */ todo) => todo.id !== id));
  };

  /**
   *
   * @param {number} id
   */
  const updateCheckMark = (id) => {
    setTodos(
      todos.map((/** @type {Todo} */ todo) => {
        todo.id === id ? (todo.isComplete = !todo.isComplete) : null;
        return todo;
      })
    );
  };

  useEffect(() => {
    showAllTodos(setUITodos, todos, setUIState);
  }, []);

  useEffect(() => {
    uiState(setUITodos, todos, setUIState);
  }, [todos]);

  return (
    <div className={"todos" + (nightMode ? " night-todos" : "")}>
      <div>
        <img />
        <input
          type="text"
          placeholder="Create a new todo..."
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
      {uiTodos.map((/** @type {Todo} */ todo) => {
        return (
          <TodoItem
            id={todo.id}
            message={todo.message}
            isComplete={todo.isComplete}
            del={delTodo}
            updateCheckMark={updateCheckMark}
          />
        );
      })}
      <p>5 Items left</p>
      <p
        onClick={(e) => {
          showAllTodos(setUITodos, todos, setUIState);
        }}
      >
        All
      </p>
      <p
        onClick={(e) => {
          showActiveTodos(setUITodos, todos, setUIState);
        }}
      >
        Active
      </p>
      <p
        onClick={(e) => {
          showCompletedTodos(setUITodos, todos, setUIState);
        }}
      >
        Completed
      </p>
      <p
        onClick={(e) => {
          delCompletedTodos(setTodos, todos);
        }}
      >
        Clear Completed
      </p>
    </div>
  );
};

export default Todos;
