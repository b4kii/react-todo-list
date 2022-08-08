import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";

import Themes from "./Themes";

export default function SideBar(props) {
  return (
    <nav id="sidebar" className="sidebar-menu">
      <div className="menu-wrapper">
        <h1 className="section-header"> Saved lists: </h1>
        {props.menuStorage.map((menuName) => {
          return (
            <div
              id={uuid()}
              className="menu-item-wrapper"
              key={uuid()}
              onClick={() => {
                props.current(menuName);
                props.setMessage({ msg: `Selected: ${menuName}`, id: uuid() }); // testing
                props.changeSaveName("");

                document.getElementById(
                  "list-title"
                ).textContent = `${menuName}:`;
              }}
            >
              <div className="menu-item">{menuName}</div>
              <button
                className="remove-btn"
                onClick={(e) => {
                  props.remove(menuName);
                }}
                aria-label="Remove list"
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          );
        })}
      </div>
      <Themes />
    </nav>
  );
}
