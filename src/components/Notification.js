import React from "react";

export default function Notification(props) {
  return (
    Object.keys(props.message.msg).length !== 0 && (
      <div id="message" className="message" key={props.message.id}>
        {props.message.msg}
        <div className="square"></div>
      </div>
    )
  );
}
