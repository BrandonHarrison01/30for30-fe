import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid black;
  width: 33%;
  margin: 0 auto;
`;

function Goal(props) {
  return (
    <Card>
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
    </Card>
  );
}

export default Goal;
