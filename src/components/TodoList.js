import React from "react";
// import { v4 as uuid } from "uuid";

// import Task from "./Task";

export default function TodoList(props) {

  // const saveEditedTask = (e, id) => {
  //   props.setTodoList(current => 
  //     current.map(task => {
  //       if(task.id === id) {
  //         return {...task, task: e.target.textContent}
  //       }
  //       return task
  //     }));
  //   e.target.contentEditable = false;
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
                >
                  - {item.task}
                  <div className="line"></div>
                </div>

                // testing
                // <div className="task-wrapper" key={item.id}>
                //   <Task
                //     data="false"
                //     taskId={item.id}
                //     taskContent={item.task}
                //     handleIsDone={props.handleIsDone}
                //     saveEditedTask={saveEditedTask}
                //   />
                //   <button 
                //     className="task-button done"
                //     onClick={props.handleIsDone}
                //   >
                //     DONE
                //   </button>
                //   <button
                //     className="task-button edit"
                //     key={uuid()}
                //     onClick={(e) => {
                //       const getTask = e.target.parentElement.querySelector(".task");
                //       let range = new Range();
                //       range.setEnd(getTask.firstChild, 1)
                //       getTask.contentEditable = true;
                //       getTask.focus();
                //     }}
                //   >
                //     EDIT
                //   </button>
                // </div>
              )
          )
        )}
      </div>
    </div>
  );
}
