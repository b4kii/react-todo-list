import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
import { useSwipeable } from "react-swipeable";

import Themes from "./Themes";

export default function SideBar(props) {
  const hideSidebar = {
    width: "50px",
    opacity: "0",
  };

  const showSidebar = {
    width: "500px",
    opacity: "1",
  };

  const showOverlay = {
    width: "50px",
    zIndex: "3",
  };

  const hideOverlay = {
    width: "0",
    zIndex: "0",
  };

  const handlers = useSwipeable({
    onSwipedRight: () => {
      props.setDisplaySidebar(() => true);
    },
    onSwipedLeft: () => {
      props.setDisplaySidebar(() => false );
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <nav
      id="sidebar"
      className="sidebar-menu"
      {...handlers}
      style={props.displaySidebar ? showSidebar : hideSidebar}
    >
      <div
        id="swipe-overlay"
        className="swipe-overlay"
        style={props.displaySidebar ? hideOverlay : showOverlay}
      ></div>
      <div className="menu-wrapper">
        <h1 className="section-header"> Saved lists: </h1>
        {props.storageList.map((menuName) => {
          return (
            <div
              id={uuid()}
              className="menu-item-wrapper"
              key={uuid()}
              onClick={() => {
                props.displayCurrentList(menuName);
                props.setMessage({ msg: `Selected: ${menuName}`, id: uuid() }); // testing
                props.setMenuName("");

                document.getElementById(
                  "list-title"
                ).textContent = `${menuName}:`;
              }}
            >
              <div className="menu-item">{menuName}</div>
              <button
                className="remove-btn"
                onClick={(e) => {
                  props.removeLocalTaskList(menuName);
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
