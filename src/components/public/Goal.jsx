import React from 'react'

function Goal(props) {
    if(props.post.privacy === 'public' && !props.post.complete){
        return(
            <div className='publicGoalContainer'>
                <h4>{props.userId[props.post.user_id]}</h4>
                <p><b>Category:</b> {props.post.category_name}</p>
                <h5>{props.post.item_name}</h5>
                {/* <p>Goal Description: {props.post.description}</p> */}
                <p>by {props.post.target_date}</p>
            </div>
        )
    } else {
        return  null
    }
}

export default Goal
