import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosWithAuth } from '../axiosAuth'

function UserGoals(){

    const [userData, setUserData] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://thirty-before-thirty-bw.herokuapp.com/api/user-items')
            .then(res => {
                console.log(res)
                setUserData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <h1>Personal Goals</h1>
            <Link to='/feed'>Feed</Link>
            {userData.map(card => 
                <div>
                    <p>category {card.category_name}</p>
                    <p>{card.item_name}</p>
                    <p>{card.description}</p>
                    <p>{card.target_date}</p>
                </div>
            )}
        </div>
        )

}

export default UserGoals