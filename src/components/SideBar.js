import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {v4 as uuid} from "uuid";

import DarkMode from "./DarkMode";

export default function SideBar(props) {
  return (
    <nav id="sidebar" className="sidebar-menu">
      <div className="menu-wrapper">
        <h1 className="section-header"> Saved lists </h1>
        {props.menuStorage.map((menuName) => {
          return (
            <div
              id={uuid()}
              className="menu-item-wrapper"
              key={uuid()} // i know that it's changing every render, but dunno how much of an impact does it has
              onClick={() => {
                props.current(menuName);
                document.getElementById("list-title").textContent = menuName;
                console.log(menuName);
              }}
            >
              <div className="menu-item">{menuName}</div>
              <button className="remove-btn" onClick={() => props.remove(menuName)}>
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="dark-mode-wrapper">
        <DarkMode />
      </div>
    </nav>
  );
}
