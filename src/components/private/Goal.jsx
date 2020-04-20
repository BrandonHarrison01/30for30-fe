import React from "react";
import { Button } from 'reactstrap'

function Goal(props) {
  return (
    <div className='goalContainer'>
      <p><b>Category:</b> {props.card.category_name}</p>
      <p className='title'><b>Title:</b> {props.card.item_name}</p>
      <p className='description'>{props.card.description}</p>
      <p><b>Finish by:</b> {props.card.target_date}</p>
      <div className='buttonContainer'>
        <Button color='danger' onClick={() => props.handleDelete(props.card.id)}>Delete</Button >
        {props.card.complete ? (
          <Button color='warning' onClick={() => props.itemIncomplete(props.card)}>
            Toggle Incomplete
          </Button>
        ) : (
          <Button color='success' onClick={() => props.itemComplete(props.card)}>
            Goal Complete
          </Button>
        )}
      </div>
    </div>
  );
}

export default Goal;
