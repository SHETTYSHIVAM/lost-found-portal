import React from 'react'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, LogIn, MailQuestionIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function DashBoard() {
    //const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail, handleLogout } = useAuth();
    const [ isLoggedIn, setIsLoggedIn, name, setName, email, setEmail, handleLogout ] = useAuth();
    return (
        <>
          
        </>
      )
}

export default DashBoard
