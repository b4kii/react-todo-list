import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function Save(props) {
  return (
    <>
      <div className="save-wrapper">
        <input
          id="save"
          className="save-input"
          onChange={props.handleNameChange}
          value={props.menuName}
          onFocus={props.handleFocus}
          placeholder="List name.."
        />
        <button
          className="save-btn"
          onClick={() => {
            props.handleSave();
          }}
          aria-label="Save list"
        >
          <FontAwesomeIcon icon={faFloppyDisk} size="2xl" />
        </button>
      </div>
    </>
  );
}