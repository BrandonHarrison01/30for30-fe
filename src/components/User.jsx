import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../axiosAuth'

function User(){

    const [userData, setUserData] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://thirty-before-thirty-bw.herokuapp.com/api/user-items')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])

        return(
            <div>
                <h1>user</h1>
            </div>
        )

}

export default User