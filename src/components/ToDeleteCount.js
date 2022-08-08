import React from "react";
import { v4 as uuid } from "uuid";

export default function ToDeleteCount({ toDelete, todoList }) {
  return (
    toDelete.length !== 0 && (
      <div className="test" key={uuid()}>
        {toDelete.length}/{todoList.length}
      </div>
    )
  );
}
