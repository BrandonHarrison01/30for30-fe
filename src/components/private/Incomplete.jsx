import React from "react";
import { Button } from 'reactstrap'

import Goal from "./Goal";

function Incomplete(props) {
  const itemComplete = card => {
    props.toggleComplete(card, true);
  };

  return (
    <div className='incompleteContainer'>
      <h3>To be completed...</h3>
      <Button color='primary' onClick={() => props.setNewGoalFormModal(1)}>Create New Goal</Button>
      <div className='mappedGoals'>
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
    </div>
  );
}

export default Incomplete;
