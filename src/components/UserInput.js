import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

export default function TodoList(props) {
  return (
    <>
      <div id="message" className="message">
        {props.message}
      </div>
      <input
        id="task"
        className="user-input"
        onChange={props.inputChange}
        value={props.value}
        placeholder="Task.."
      />
      <div className="btn-wrapper">
        <button
          id="btn"
          className="task-btn add"
          onClick={() => {
            props.add();
            props.value === "" && props.showMessage();
          }}
          aria-label="Add task"
        >
          <FontAwesomeIcon icon={faPlusSquare} size="2xl" />
        </button>
        <button
          className="task-btn delete"
          onClick={props.del}
          aria-label="Delete task"
        >
          <FontAwesomeIcon icon={faMinusSquare} size="2xl" />
        </button>
        <button
          className="task-btn clear"
          onClick={() => {
            props.clear();
            props.showMessage();
          }}
          aria-label="Clear"
        >
          <FontAwesomeIcon icon={faDeleteLeft} size="2xl" />
        </button>
      </div>
    </>
  );
}