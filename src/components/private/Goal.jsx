import React from "react";

function Goal(props) {
  return (
    <div>
      <p>category {props.card.category_name}</p>
      <p>{props.card.item_name}</p>
      <p>{props.card.description}</p>
      <p>{props.card.target_date}</p>
      <button onClick={() => props.handleDelete(props.card.id)}>Delete</button>
      {props.card.complete ? (
        <button onClick={() => props.itemIncomplete(props.card)}>
          Toggle Incomplete
        </button>
      ) : (
        <button onClick={() => props.itemComplete(props.card)}>
          Toggle Complete
        </button>
      )}
    </div>
  );
}

export default Goal;
