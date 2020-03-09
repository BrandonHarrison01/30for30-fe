import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../axiosAuth'

import Feed from './Feed'

function PublicGoals(props) {
    let [feed, setFeed] = useState([])
    let userId = {}

    useEffect(() => {
        axiosWithAuth()
            .get('https://thirty-before-thirty-bw.herokuapp.com/api/items')
            .then(res => {
                setFeed(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    props.users.map(user => userId[user.id] = user.username)

    return(
        <div>
            <h1>Public Goals</h1>
            {feed.map(post => <Feed key={post.id} userId={userId} post={post} />)}
        </div>
    )
}

export default PublicGoals
