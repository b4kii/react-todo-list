import React from "react";

export default function Task(props) {
  return (
    <div
      data-done={props.data}
      className="task"
      id={props.taskId}
      // onClick={props.handleIsDone}
      onBlur={(e) => {
        const getId = e.target.id;
        props.saveEditedTask(e, getId);
      }}
      // onBlur={(e) => {
      //   const getId = e.target.id;
      // }}
    >
      {props.taskContent}
      <div className="line"></div>
    </div>
  );
}
