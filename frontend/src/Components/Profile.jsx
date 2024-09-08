// src/pages/Profile.js

import { useEffect } from "react";
import { User, Mail, AlertCircle, MessageSquare, Settings } from 'react-feather';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { isLoggedIn, name, email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <ul className="mt-4">
            <Link className="flex items-center py-2 px-4 hover:bg-gray-700">
              <User className="mr-2" />
              Dashboard
            </Link>
            <Link to={"/forgotPassword"} className="flex items-center py-2 px-4 hover:bg-gray-700">
              <Settings className="mr-2" />
              Reset Password
            </Link>
            <Link className="flex items-center py-2 px-4 hover:bg-gray-700">
              <AlertCircle className="mr-2" />
              Notifications
            </Link>
            <Link className="flex items-center py-2 px-4 hover:bg-gray-700" to={"/all-chats"}>
              <MessageSquare className="mr-2" />
              Chats
            </Link>
            <Link
            to="/myListings"
             className="flex items-center py-2 px-4 hover:bg-gray-700">
              <Mail className="mr-2" />
              My Listings
            </Link>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="flex items-center w-full min-h-10 mx-4 rounded-lg shadow-md p-3">
          {/* <img src={avatar} alt="Profile" className="h-16 w-16 rounded-full" /> */}
          <div className="ml-4 mx-4">
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8">
          <div className='my-4 flex flex-col p-3 py-5 shadow-md'>
            <h1 className='text-3xl text-center font-sans text-gray-600'>Stats</h1>
            <div className='w-full h-screen/5 flex flex-row justify-evenly'>
              {/* Add your stats content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
