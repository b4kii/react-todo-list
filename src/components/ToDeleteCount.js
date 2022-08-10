import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function ToDeleteCount({ toDelete, todoList }) {
  const [changeId, setChangeId] = useState(uuid());

  useEffect(() => {
    setChangeId(uuid());
  }, [toDelete]);

  return (
    toDelete.length !== 0 &&
    todoList.length !== 0 &&
     (
      <div className="to-delete-counter" key={changeId}>
        {toDelete.length}/{todoList.length}
      </div>
    )
  );
}
