import React from 'react'
import { axiosWithAuth } from '../../axiosAuth'

function Goal(props){
    return(
        <div>
            <p>category {props.card.category_name}</p>
            <p>{props.card.item_name}</p>
            <p>{props.card.description}</p>
            <p>{props.card.target_date}</p>
            <button onClick={() => props.handleDelete(props.card.id)}>Delete</button>
        </div>
    )
}

export default Goal