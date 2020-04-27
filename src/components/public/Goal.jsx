import React from 'react'
import { Button } from 'reactstrap'

function Goal(props) {
    if(props.post.privacy === 'public' && !props.post.complete){
        return(
            <div className='publicGoalContainer' onClick={() => props.toggleGoalModal(props.post)}>
                {props.currentUser == 'brandon' && <Button outline color='danger' onClick={() => props.deleteGoal(props.post.id)}>Admin Delete</Button>}
                <h4>{props.userId[props.post.user_id]}</h4>
                <p><b>Category:</b> {props.post.category_name}</p>
                <h5>{props.post.item_name}</h5>
                <p>by {props.post.target_date}</p>
            </div>
        )
    } else {
        return  null
    }
}

export default Goal
