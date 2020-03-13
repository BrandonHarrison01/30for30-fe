import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosWithAuth } from '../../axiosAuth'

import Goal from './Goal'

function UserGoals(props){

    const [userData, setUserData] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://thirty-before-thirty-bw.herokuapp.com/api/user-items')
            .then(res => setUserData(res.data))
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        console.log('logging out')
        props.history.push('/')
        localStorage.removeItem('token')
    }

    return(
        <div>
            <h1>Personal Goals</h1>
            <Link to='/feed'>Feed</Link>
            {userData.map(card => <Goal card={card}  key={card.id}/> )}
            <button onClick={logout}>Logout</button>
        </div>
        )

}

export default UserGoals