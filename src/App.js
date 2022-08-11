import React from "react";
import { useState, useEffect, createContext } from "react";
import { v4 as uuid } from "uuid";

// TODO: Local storage is pushing things randomly, have to change way of saving todo list.
//       I have an idea how to solve this, but i don't have time

import UserInput from "./components/UserInput";
import TodoList from "./components/TodoList";
import Sidebar from "./components/Sidebar";
import Save from "./components/Save";
import CloseButton from "./components/CloseButton";
import Notification from "./components/Notification";
import ToDeleteCount from "./components/ToDeleteCount";
import Footer from "./components/Footer";

export const ThemeContext = createContext(null);

function App() {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [toDelete, setToDelete] = useState([]);
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [storageList, setStorageList] = useState([]);
  const [currentListName, setCurrentListName] = useState("");
  const [message, setMessage] = useState({ msg: "", id: "" });

  const [theme, setTheme] = useState("");

  // User input
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask !== "") {
      setTodoList((current) => [...current, { task: newTask, id: uuid() }]);
    } else {
      setMessage({ msg: "Add task!", id: uuid() });
    }
    setNewTask("");
  };

  const handleDeleteTask = () => {
    if (toDelete.length > 0) {
      const filtered = todoList.filter((task) => {
        return !toDelete.some((item) => {
          document
            .getElementById(`${item.id}`)
            .setAttribute("data-done", false);
          document.getElementById(`${item.id}`).querySelector(".line").style =
            "width: 0;";
          return task.id === item.id;
        });
      });

      if (toDelete.length === 1) {
        setMessage({ msg: "Deleted task!", id: uuid() });
      } else {
        setMessage({ msg: "Deleted tasks!", id: uuid() });
      }

      setTodoList(filtered);
      setToDelete([]);
    } else {
      setMessage({ msg: "Nothing to delete!", id: uuid() });
    }
  };

  const handleIsDone = (event) => {
    let isDone = event.target.getAttribute("data-done");
    let targetId = event.target.id;

    if (isDone === "false") {
      event.target.querySelector(".line").style = "width: calc(100% + 0.8rem)";
      event.target.style = "color: var(--isdone-color)";
      setToDelete((current) => {
        return [...current, { id: targetId }];
      });
      event.target.setAttribute("data-done", "true");
    } else {
      event.target.querySelector(".line").style = "width: 0";
      event.target.style = "color: var(--body-color)";
      setToDelete((current) =>
        current.filter((obj) => {
          return obj.id !== targetId;
        })
      );
      event.target.setAttribute("data-done", "false");
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("btn").click();
    }
  };

  const removeCheckMark = () => {
    toDelete.forEach((item) => {
      let task = document.getElementById(item.id);
      let line = task.querySelector(".line");
      line.style = "width: 0;";
      task.style = "color: var(--body-color)";
      task.setAttribute("data-done", "false");
    });
  };

  const handleClear = () => {
    if (
      currentListName === "" &&
      menuName === "" &&
      newTask === "" &&
      todoList.length === 0
    ) {
      setMessage({ msg: "Nothing to clear!", id: uuid() });
    } else {
      setCurrentListName("");
      setMenuName("");
      setNewTask("");
      setTodoList([]);
      setToDelete([]);
      document.getElementById("list-title").textContent = "";
      setMessage({ msg: "Cleared!", id: uuid() });
    }
  };

  // Saving list
  const saveLocalTaskList = (menuName) => {
    if (menuName !== "") {
      localStorage.setItem(menuName, JSON.stringify(todoList));
    }
  };

  const getLocalTaskList = (menuName) => {
    return JSON.parse(localStorage.getItem(menuName));
  };

  const removeLocalTaskList = (menuName) => {
    localStorage.removeItem(menuName);
    document.getElementById("list-title").textContent = "";
    getLocalStorage();
    setMessage({ msg: `Removed: ${currentListName}`, id: uuid() });
  };

  const getLocalStorage = () => {
    const keys = Object.keys(localStorage);
    setStorageList(() =>
      keys.filter((key) => {
        return key !== "theme" && key !== "menus";
      })
    );
  };

  const handleNameChange = (event) => {
    setMenuName(event.target.value);
  };

  const displayCurrentList = (menuName) => {
    const list = getLocalTaskList(menuName);
    if (list === null) setTodoList([]);
    else {
      setTodoList(list);
    }
    setCurrentListName(menuName);
    removeCheckMark();
    setToDelete([]);
  };

  const handleSave = () => {
    const test = getLocalTaskList(menuName);

    if (menuName !== "" && todoList.length !== 0 && test === null) {
      // setTemp(current => ({menuName: menuName, ...current}))
      saveLocalTaskList(menuName);
      setNewTask("");
      setMenuName("");
      setMessage({ msg: `Saved: ${menuName}`, id: uuid() });
      getLocalStorage();
      setTodoList([]);
      setToDelete([]);
    }

    if (test !== null) {
      setMessage({ msg: "Change list name!", id: uuid() });
    }

    if (menuName === "") {
      setMessage({ msg: "Provide list name!", id: uuid() });
    }
    if (todoList.length === 0) {
      setMessage({ msg: "Task list is empty!", id: uuid() });
    }
  };

  const handleFocus = () => {
    if (currentListName !== "") {
      setTodoList([]);
      setToDelete([]);
      setCurrentListName("");
      document.getElementById("list-title").textContent = "";
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);
    getLocalStorage();

    // Saving theme
    let getDefaultTheme = localStorage.getItem("theme");
    if (!getDefaultTheme) {
      localStorage.settem("theme", "dark");
      getDefaultTheme = localStorage.getItem("theme");
      setTheme(getDefaultTheme);
    }
    setTheme(getDefaultTheme);

    return () => document.removeEventListener("keydown", handleEnterPress);
  }, []);

  useEffect(() => {
    saveLocalTaskList(currentListName);
    if (todoList.length === 0 && currentListName !== "") {
      removeLocalTaskList(currentListName);
    }
  }, [todoList]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <Notification message={message} />
        <CloseButton
          setDisplaySidebar={setDisplaySidebar}
          displaySidebar={displaySidebar}
        />
        <Sidebar
          storageList={storageList}
          displayCurrentList={displayCurrentList}
          removeLocalTaskList={removeLocalTaskList}
          setMenuName={setMenuName}
          setMessage={setMessage}
          setDisplaySidebar={setDisplaySidebar}
          displaySidebar={displaySidebar}
        />

        <div id="todo-wrapper" className="wrapper">
          <div className="top">
            <h1 className="section-header">TODO:</h1>
            <div className="input-wrapper">
              <Save
                handleNameChange={handleNameChange}
                menuName={menuName}
                handleSave={handleSave}
                handleFocus={handleFocus}
              />

              <UserInput
                handleInputChange={handleInputChange}
                newTask={newTask}
                handleAddTask={handleAddTask}
                handleDeleteTask={handleDeleteTask}
                handleClear={handleClear}
                message={message}
              />
            </div>
          </div>
          <TodoList
            todoList={todoList}
            // setToDelete={setToDelete}
            handleIsDone={handleIsDone}
          />
        </div>
        <ToDeleteCount toDelete={toDelete} todoList={todoList} />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
