import React from 'react'
import { axiosWithAuth } from '../../axiosAuth'

function Goal(props){

    const handleDelete = id => {
        axiosWithAuth()
            .delete(`https://thirty-before-thirty-bw.herokuapp.com/api/remove-item/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // console.log(id, 'here is id')
    }

    return(
        <div>
            <p>category {props.card.category_name}</p>
            <p>{props.card.item_name}</p>
            <p>{props.card.description}</p>
            <p>{props.card.target_date}</p>
            <button onClick={() => handleDelete(props.card.id)}>Delete</button>
        </div>
    )
}

export default Goal