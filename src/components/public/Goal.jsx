import React from 'react'

function Goal(props) {
    if(props.post.privacy === 'public'){
        return(
            <div>
                <p>{props.post.category_name}</p>
                <p>{props.post.item_name}</p>
                <p>{props.post.description}</p>
                <p>{props.userId[props.post.user_id]}</p>
                <p>{props.post.target_date}</p>
            </div>
        )
    } else {
        return  null
    }
}

export default Goal
