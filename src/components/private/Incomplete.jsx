import React from "react";
import Goal from "./Goal";

function Incomplete(props) {
  const itemComplete = card => {
    props.toggleComplete(card, true);
  };

  return (
    <div>
      {props.userData.map(
        card =>
          !card.complete && (
            <Goal
              key={card.id}
              card={card}
              handleDelete={props.handleDelete}
              itemComplete={itemComplete}
            />
          )
      )}
    </div>
  );
}

export default Incomplete;
