import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

function UserChats() {
    const { userId } = useAuth();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axiosInstance.get(`http://127.0.0.1:8000/chats/user-chats/${userId}`);
                setChats(res.data.user_chats); // Assuming res.data has a 'user_chats' array
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        if (userId) {
            fetchChats();
        }
    }, [userId]);

    return (
        <div className="flex flex-col justify-center items-center my-2">
            <h1 className="font-sans font-bold text-lg">Previous Chats</h1>
            <div className='flex flex-col justify-center my-1 shadow-sm'>
                <ul className='flex flex-col divide-y divide-gray-200'>
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <li className="border-4 rounded-md py-2 px-5" key={chat.room}>
                                <Link to={`/chat/${chat.room}/${chat.other_user}`}>
                                    <div className="grid grid-cols-6 space-x-0 items-center justify-start">
                                        <User className='rounded-full bg-gray-300 p-1' size={40} />

                                        <div className="flex p-2 text-left flex-col shadow-sm">
                                            <h3 className='text-xl font-semibold leading-snug sm:pr-8'>
                                                {chat.other_user?.username || 'Unknown User'}
                                            </h3>
                                            <p className='text-gray-500 text-md'>
                                                {chat.messages?.length > 0 
                                                    ? chat.messages[chat.messages.length - 1].messages 
                                                    : 'No Messages'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>No chats available</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default UserChats;
