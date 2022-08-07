import React from "react";
import { useState, useEffect, createContext } from "react";
import { v4 as uuid } from "uuid";

// TODO: REFACTOR THIS UGLY PIECE OF C*DE!!!!!
// TODO: Local storage is randomly pushing objects cuz it can, so i have to fix this somehow
// TODO: Try to save one item called menu with its submenus instead of multiple items in local storage
// TODO: Saving theme is crap, as everything here, have to prevent flash of dark theme on initial render

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
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [storageList, setStorageList] = useState([]);
  const [currentListName, setCurrentListName] = useState("");
  const [message, setMessage] = useState({});

  const [theme, setTheme] = useState("");

  // User input
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask !== "") {
      setTodoList((current) => [...current, { task: newTask, id: uuid() }]);
    } else {
      setMessage({msg: "Add task!", id: uuid()}) // testing
    }
    setNewTask("");
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
    setMenuName("");
    setNewTask("");
    setMessage({msg: "Cleared!", id: uuid()}) // testing
    document.getElementById("list-title").textContent = "";
    setTodoList([]);
  };

  // Sidebar
  const showSideBar = () => {
    if (displaySidebar) {
      document.getElementById("sidebar").style = "width: 0;";

      //Button animation
      document.getElementById("first-block").style = "transform: rotate(0) ";
      document.getElementById("second-block").style = "transform: rotate(0) ";
      document.getElementById("hamburger").style = "transform: translateX(0);";
      setDisplaySidebar((current) => !current);
    } else {
      document.getElementById("sidebar").style = "width: 500px;";

      //Button animation
      document.getElementById("first-block").style =
        "transform: rotate(45deg) translateY(9px)";
      document.getElementById("second-block").style =
        "transform: rotate(-45deg) translateY(-9px)";
      document.getElementById("hamburger").style =
        "transform: translateX(7px);";
      setDisplaySidebar((current) => !current);
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
    setMessage({msg: `Removed: ${menuName}`, id: uuid()}) // testing
    localStorage.removeItem(menuName);
    document.getElementById("list-title").textContent = "";
    getLocalStorage();
  };

  const getLocalStorage = () => {
    const keys = Object.keys(localStorage);
    setStorageList(() =>
      keys.filter((key) => {
        return key !== "theme";
      })
    );
  };

  const handleNameChange = (event) => {
    setMenuName(event.target.value);
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
    if (menuName !== "" && todoList.length !== 0) {
      saveLocalList(menuName); // testing
      setNewTask(""); // testing
      setMenuName(""); // testing

      setMessage({msg: `Saved: ${menuName}`, id: uuid()}) // testing

      getLocalStorage();
      setTodoList([]);
    }

    if (menuName === "") {
      setMessage({msg: "Provide list name!", id: uuid()}) // testing
    }
    if (todoList.length === 0) {
      setMessage({msg: "Task list is empty!", id: uuid()}) // testing
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
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPress);
    getLocalStorage();

    // Saving theme
    let getDefaultTheme = localStorage.getItem("theme");
    console.log("local", localStorage.getItem("theme"));
    if (!getDefaultTheme) {
      localStorage.setItem("theme", "dark");
      getDefaultTheme = localStorage.getItem("theme");
      setTheme(getDefaultTheme);
    }
    setTheme(getDefaultTheme);

    return () => document.removeEventListener("keydown", handleEnterPress);
  }, []);

  useEffect(() => {
    saveLocalList(currentListName);
    if (todoList.length === 0 && currentListName !== "") {
      removeLocalList(currentListName);
    }
  }, [todoList]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <CloseButton showSideBar={showSideBar} />
        <SideBar
          menuStorage={storageList}
          getLocal={getLocalList}
          current={displayCurrentList}
          remove={removeLocalList}
          changeSaveName={setMenuName}
          setMessage={setMessage}
        />

        <div id="todo-wrapper" className="wrapper">
          <div className="top">
            <h1 className="section-header">TODO:</h1>
            <div className="input-wrapper">
              <Save
                nameChange={handleNameChange}
                value={menuName} // testing
                save={handleSave}
                focus={handleFocus}
              />

              <UserInput
                inputChange={handleInputChange}
                value={newTask} // testing
                add={handleAddTask}
                del={handleDeleteTask}
                clear={handleClear}
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
