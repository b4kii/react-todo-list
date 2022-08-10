import React from "react";

export default function TodoList(props) {
  // const handleIsDone = (event) => {
  //   let isDone = event.target.getAttribute("data-done");
  //   let targetId = event.target.id;

  //   if (isDone === "false") {
  //     event.target.querySelector(".line").style = "width: calc(100% + 0.8rem)";
  //     event.target.style = "color: var(--isdone-color)";
  //     props.setToDelete((current) => {
  //       return [...current, { id: targetId }];
  //     });
  //     event.target.setAttribute("data-done", "true");
  //   } else {
  //     event.target.querySelector(".line").style = "width: 0";
  //     event.target.style = "color: var(--body-color)";
  //     props.setToDelete((current) =>
  //       current.filter((obj) => {
  //         return obj.id !== targetId;
  //       })
  //     );
  //     event.target.setAttribute("data-done", "false");
  //   }
  // };


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
                  // onClick={handleIsDone}
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
