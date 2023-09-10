//@ts-check
import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} message
 * @property {boolean} isComplete
 */

/**
 *
 * @param {Todo} todo
 * @param {Todo[]} todos
 * @param {function} setTodos
 * @returns
 */
const addTodo = (todo, todos, setTodos) => {
  setTodos([...todos, todo]);
  return [...todos, todo];
};

/**
 *
 * @param {Object} p
 * @param {boolean} p.nightMode
 * @returns
 */
const Todos = ({ nightMode }) => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  return <div className={"todos" + (nightMode ? " night-todos" : "")}></div>;
};

export default Todos;
