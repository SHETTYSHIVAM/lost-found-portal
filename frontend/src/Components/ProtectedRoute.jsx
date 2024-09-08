import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Protected({children}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const { isLoggedIn, setIsLoggedIn, name, userId, setUserId, setName, email, setEmail, handleLogout } = useAuth();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin')
            
        }else{
            navigate('/')
        }
        setLoader(false)

    }, [isLoggedIn, navigate])

    return (
        loader? <h1>Loading...</h1>
        :
        <>{children}</>
    )
}

export default Protected
