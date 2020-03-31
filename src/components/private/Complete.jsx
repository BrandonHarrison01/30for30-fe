import React from "react";
import styled from 'styled-components'

import Goal from "./Goal";

const CompleteGoals = styled.div`
    width: 100%;
    background-color: green
`

function Complete(props) {
  return (
    <CompleteGoals>
      {props.userData.map(
        card =>
          card.complete && (
            <Goal key={card.id} card={card} handleDelete={props.handleDelete} />
          )
      )}
    </CompleteGoals>
  );
}

export default Complete;
