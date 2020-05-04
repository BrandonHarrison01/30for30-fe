import React from "react";

import Goal from "./Goal";

function Complete(props) {
  const itemIncomplete = card => {
    props.toggleComplete(card, false);
  };

  return (
    <div className='completeContainer'>
      <h3>Finished!</h3>
      <div className='mappedGoals'>
        {props.userData.map(
          card =>
            card.complete && (
              <Goal
                key={card.id}
                card={card}
                handleDelete={props.handleDelete}
                itemIncomplete={itemIncomplete}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Complete;
