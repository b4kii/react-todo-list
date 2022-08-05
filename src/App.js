import React from "react";
import { useState, useEffect, createContext } from "react";
import { v4 as uuid } from "uuid";

// TODO: REFACTOR THIS UGLY PIECE OF C*DE!!!!!
// TODO: Find convenient solution to unique id/key
// TODO: add some basic validation
// TODO: localstorage is randomly pushing objects cuz it can, so i have to fix this somehow

import UserInput from "./components/UserInput";
import TodoList from "./components/TodoList";
import SideBar from "./components/SideBar";
import Save from "./components/Save";
import CloseButton from "./components/CloseButton";

export const ThemeContext = createContext(null);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [toDelete, setToDelete] = useState([]);
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [storageList, setStorageList] = useState([]);
  const [currentListName, setCurrentListName] = useState("");

  const [theme, setTheme] = useState("dark");

  // User input
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    const taskInput = document.getElementById("task");

    if (taskInput.value !== "") {
      setTodoList((current) => [...current, { task: newTask, id: uuid() }]);
    }
    // setId((previous) => previous + 1);
    taskInput.value = "";
  };

  const handleDeleteTask = () => {
    const filtered = todoList.filter((task) => {
      return !toDelete.some((item) => {
        document.getElementById(`${item.id}`).setAttribute("data-done", false);
        document.getElementById(`${item.id}`).querySelector(".line").style =
          "width: 0;";
        if (task.id === item.id) {
          console.log(`filtered: ${task.id}, to delete: ${item.id}`);
        }
        return task.id === item.id;
      });
    });

    setTodoList(filtered);
    setToDelete([]);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("btn").click();
    }
  };

  const handleIsDone = (event) => {
    let isDone = event.target.getAttribute("data-done");
    // let targetId = parseInt(event.target.id);
    let targetId = event.target.id;
    console.log(targetId);

    if (isDone === "false") {
      event.target.querySelector(".line").style = "width: calc(100% + 0.8rem);";
      event.target.style = "color: #626262";
      setToDelete((current) => {
        return [...current, { id: targetId }];
      });
      event.target.setAttribute("data-done", "true");
    } else {
      event.target.querySelector(".line").style = "width: 0;";
      event.target.style = "color: inherit";
      setToDelete((current) =>
        current.filter((obj) => {
          return obj.id !== targetId;
        })
      );
      event.target.setAttribute("data-done", "false");
    }
  };

  const handleClear = () => {
    setCurrentListName("");
    document.getElementById("save").value = "";
    document.getElementById("task").value = "";
    document.getElementById("list-title").textContent = "";
    setTodoList([]);
    // setId(0);
  };

  // Sidebar
  const showSideBar = () => {
    if (display) {
      document.getElementById("sidebar").style = "width: 0;";
      //Button animation
      document.getElementById("first-block").style = "transform: rotate(0) ";
      document.getElementById("second-block").style = "transform: rotate(0) ";
      document.getElementById("hamburger").style = "transform: translateX(0);";
      setDisplay((current) => !current);
    } else {
      document.getElementById("sidebar").style = "width: 400px;";
      //Button animation
      document.getElementById("first-block").style =
        "transform: rotate(45deg) translateY(9px)";
      document.getElementById("second-block").style =
        "transform: rotate(-45deg) translateY(-9px)";
      document.getElementById("hamburger").style =
        "transform: translateX(7px);";
      setDisplay((current) => !current);
    }
  };

  // Saving list
  const saveLocalList = (name) => {
    // const key = Date.now();
    if (name !== "") {
      localStorage.setItem(name, JSON.stringify([...todoList]));
      // localStorage.setItem(name, JSON.stringify([...todoList, {key: key}]));
    }
  };

  const getLocalList = (name) => {
    const data = JSON.parse(localStorage.getItem(name));
    return data;
  };

  const removeLocalList = (name) => {
    localStorage.removeItem(name);
    document.getElementById("list-title").textContent = "";
    getLocalStorage();
  };

  const getLocalStorage = () => {
    const keys = Object.keys(localStorage);
    setStorageList(keys);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const displayCurrentList = (menuName) => {
    const list = getLocalList(menuName);
    if (list === null) setTodoList([]);
    else {
      // setTodoList([]); // idk
      setTodoList(list);
    }
    setCurrentListName(menuName);
  };

  const handleSave = () => {
    const nameInput = document.getElementById("save");
    const taskInput = document.getElementById("task");

    if (nameInput.value !== "" && todoList.length !== 0) {
      saveLocalList(nameInput.value);
      // saveLocalList(name);
      nameInput.value = "";
      taskInput.value = "";
      getLocalStorage();
      setTodoList([]);
    } else {
      taskInput.value = "";
      alert("Provide list name!");
    }
  };

  const handleFocus = () => {
    if (currentListName !== "") {
      setTodoList([]);
      setCurrentListName("");
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);

    getLocalStorage();

    return () => document.removeEventListener("keydown", handleEnterPress);
  }, []);

  useEffect(() => {
    saveLocalList(currentListName);
    if (todoList.length === 0) {
      removeLocalList(currentListName);
    }
  }, [todoList]); // :(

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <CloseButton showSideBar={showSideBar} />
        <SideBar
          menuStorage={storageList}
          getLocal={getLocalList}
          current={displayCurrentList}
          remove={removeLocalList}
          changeSaveName={setName}
        />

        <div id="todo-wrapper" className="wrapper">
          <div className="top">
            <h1 className="section-header">TODO:</h1>
            <div className="input-wrapper">
              <Save
                nameChange={handleNameChange}
                value={name}
                save={handleSave}
                focus={handleFocus}
              />

              <UserInput
                inputChange={handleInputChange}
                add={handleAddTask}
                del={handleDeleteTask}
                clear={handleClear}
              />
            </div>
          </div>
          <TodoList list={todoList} clickIsDone={handleIsDone} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
