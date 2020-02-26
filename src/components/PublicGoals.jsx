import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../axiosAuth'

function PublicGoals(props) {
    let [feed, setFeed] = useState([])
    let userId = {}

    useEffect(() => {
        axiosWithAuth()
            .get('https://thirty-before-thirty-bw.herokuapp.com/api/items')
            .then(res => {
                console.log(res)
                setFeed(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    props.users.map(user => {
        // let id = user.id
        userId[user.id] = user.username
    })

    console.log(userId)

    return(
        <div>
            <h1>Feed</h1>
            {feed.map(post => 
                post.privacy === 'public' ? 
                    <div>
                        <p>{post.category_name}</p>
                        <p>{post.item_name}</p>
                        <p>{post.description}</p>
                        <p>{userId[post.user_id]}</p>
                        <p>{post.target_date}</p>
                    </div>
                :
                    ''
            )}
        </div>
    )
}

export default PublicGoals