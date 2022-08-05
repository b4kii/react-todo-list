import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

export default function TodoList(props) {
  return (
    <>
      <input
        id="task"
        className="user-input"
        onChange={props.inputChange}
        placeholder="Task.."
      />
      <div className="btn-wrapper">
        <button id="btn" className="task-btn add" onClick={props.add}>
          {/* [+] */}
          <FontAwesomeIcon icon={faPlusSquare}  size="2xl" />
        </button>
        <button className="task-btn delete" onClick={props.del}>
          <FontAwesomeIcon icon={faMinusSquare} size="2xl" />
        </button>
        <button className="task-btn clear" onClick={props.clear}>
          <FontAwesomeIcon icon={faDeleteLeft} size="2xl" />
        </button>
      </div>
    </>
  );
}
