import React from "react";
import { useState, useEffect, createContext } from "react";
import { v4 as uuid } from "uuid";

// TODO: REFACTOR THIS UGLY PIECE OF C*DE!!!!!
// TODO: add some basic validation
// TODO: localstorage is randomly pushing objects cuz it can, so i have to fix this somehow

import UserInput from "./components/UserInput";
import TodoList from "./components/TodoList";
import SideBar from "./components/SideBar";
import Save from "./components/Save";
import CloseButton from "./components/CloseButton";

export const ThemeContext = createContext(null);
// export const StateContext = createContext(null); // testing

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [toDelete, setToDelete] = useState([]);
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [storageList, setStorageList] = useState([]);
  const [currentListName, setCurrentListName] = useState("");
  const [message, setMessage] = useState("");

  const [theme, setTheme] = useState("dark");

  // User input
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    // const taskInput = document.getElementById("task");

    // if (taskInput.value !== "") {
    if (newTask !== "") {
      // testing
      setTodoList((current) => [...current, { task: newTask, id: uuid() }]);
    } else {
      // console.log("Add task!");
      setMessage("Add task!");
    }
    // setId((previous) => previous + 1);
    // taskInput.value = "";
    setNewTask(""); // testing
  };

  const handleDeleteTask = () => {
    const filtered = todoList.filter((task) => {
      return !toDelete.some((item) => {
        document.getElementById(`${item.id}`).setAttribute("data-done", false);
        document.getElementById(`${item.id}`).querySelector(".line").style =
          "width: 0;";
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
    let targetId = event.target.id;

    if (isDone === "false") {
      event.target.querySelector(".line").style = "width: calc(100% + 0.8rem);";
      event.target.style = "color: var(--isdone-color)";
      setToDelete((current) => {
        return [...current, { id: targetId }];
      });
      event.target.setAttribute("data-done", "true");
    } else {
      event.target.querySelector(".line").style = "width: 0;";
      event.target.style = "color: var(--body-color)";
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
    // document.getElementById("save").value = "";
    setName(""); //testing
    // document.getElementById("task").value = "";
    setNewTask(""); // testing
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
      document.getElementById("sidebar").style = "width: 500px;";
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
  const saveLocalList = (menuName) => {
    if (menuName !== "") {
      localStorage.setItem(menuName, JSON.stringify([...todoList]));
    }
  };

  const getLocalList = (menuName) => {
    const data = JSON.parse(localStorage.getItem(menuName));
    return data;
  };

  const removeLocalList = (menuName) => {
    localStorage.removeItem(menuName);
    document.getElementById("list-title").textContent = "";
    // setMessage(`Removed: "${menuName}"`);
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
      setTodoList(list);
    }
    setCurrentListName(menuName);
  };

  const handleSave = () => {
    const nameInput = document.getElementById("save");
    const taskInput = document.getElementById("task");

    // if (nameInput.value !== "" && todoList.length !== 0) {
    if (name !== "" && todoList.length !== 0) {
      // testing
      // saveLocalList(nameInput.value);
      saveLocalList(name); // testing
      // nameInput.value = "";
      // taskInput.value = "";
      setNewTask(""); // testing
      setName(""); // testing

      // setMessage("Saved successfully!");
      setMessage(`Saved: ${name}`);

      getLocalStorage();
      setTodoList([]);
    }

    if (name === "") {
      setMessage("Provide list name!");
    }
    if (todoList.length === 0) {
      setMessage("Task list is empty!");
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

  const showMessage = () => {
    console.log(message);
    document.getElementById("message").style = "top: 1rem; opacity: 1;";
    setTimeout(() => {
      console.log("Timeout");
      document.getElementById("message").style = "opacity: 0";
    }, 1000);
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
          showMessage={showMessage}
          setMessage={setMessage}
        />

        <div id="todo-wrapper" className="wrapper">
          <div className="top">
            <h1 className="section-header">TODO:</h1>
            <div className="input-wrapper">
              <Save
                nameChange={handleNameChange}
                value={name} // testing
                save={handleSave}
                focus={handleFocus}
                showMessage={showMessage}
              />

              <UserInput
                inputChange={handleInputChange}
                value={newTask} // testing
                add={handleAddTask}
                del={handleDeleteTask}
                clear={handleClear}
                showMessage={showMessage}
                message={message}
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
