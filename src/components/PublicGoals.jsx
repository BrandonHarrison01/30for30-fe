import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../axiosAuth'

function PublicGoals(props) {
    let [feed, setFeed] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://thirty-before-thirty-bw.herokuapp.com/api/items')
            .then(res => {
                console.log(res)
                setFeed(res.data)
            })
            .catch(err => console.log(err))
        console.log(props.users, 'porps users')
    }, [])

    return(
        <div>
            <h1>Feed</h1>
            {feed.map(post => 
                post.privacy === 'public' ? 
                    <div>
                        <p>{post.category_name}</p>
                        <p>{post.item_name}</p>
                        <p>{post.description}</p>
                        <p>{post.user_id}</p>
                        <p>{post.target_date}</p>
                    </div>
                :
                    ''
            )}
        </div>
    )
}

export default PublicGoals