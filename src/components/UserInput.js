import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

export default function UserInput(props) {
  return (
    <>
      <input
        id="task"
        className="user-input"
        onChange={props.handleInputChange}
        value={props.newTask}
        placeholder="Task.."
      />
      <div className="btn-wrapper">
        <button
          id="btn"
          className="task-btn add"
          onClick={props.handleAddTask}
          aria-label="Add task"
        >
          <FontAwesomeIcon icon={faPlusSquare} size="2xl" />
        </button>
        <button
          className="task-btn delete"
          onClick={props.handleDeleteTask}
          aria-label="Delete task"
        >
          <FontAwesomeIcon icon={faMinusSquare} size="2xl" />
        </button>
        <button
          className="task-btn clear"
          onClick={props.handleClear}
          aria-label="Clear"
        >
          <FontAwesomeIcon icon={faDeleteLeft} size="2xl" />
        </button>
      </div>
    </>
  );
}
