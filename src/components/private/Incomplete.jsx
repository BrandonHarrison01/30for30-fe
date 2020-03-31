import React from "react";
import Goal from "./Goal";

function Incomplete(props) {
  return (
    <div>
      {props.userData.map(
        card =>
          !card.complete && (
            <Goal key={card.id} card={card} handleDelete={props.handleDelete} />
          )
      )}
    </div>
  );
}

export default Incomplete;
