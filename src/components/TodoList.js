import React from "react";

export default function TodoList(props) {
  return (
    <div className="bottom">
      <div className="tasks-container">
        <p id="list-title" className="list-title section-header"></p>
        {props.todoList.length === 0 ? (
          <div className="empty">Nothing is here..</div>
        ) : (
          props.todoList.map(
            (item) =>
              item.task != null && (
                <div
                  data-done="false"
                  key={item.id}
                  id={item.id}
                  className="task"
                  onClick={props.handleIsDone}
                >
                  - {item.task}
                  <div className="line"></div>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
}
