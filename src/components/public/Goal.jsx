import React from 'react'

function Goal(props) {
    if(props.post.privacy === 'public'){
        return(
            <div>
                <p>Category Name: {props.post.category_name}</p>
                <p>Goal: {props.post.item_name}</p>
                <p>Goal Description: {props.post.description}</p>
                <p>User: {props.userId[props.post.user_id]}</p>
                <p>Finish By: {props.post.target_date}</p>
            </div>
        )
    } else {
        return  null
    }
}

export default Goal
