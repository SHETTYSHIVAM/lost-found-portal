import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
function OwnerInfo() {
    const { ownerId } = useParams();
    console.log(ownerId)
    const [item, setItem] = useState(null);
    const [owner, setOwner] = useState(null);

    const {userId, name} = useAuth();
    console.log(userId)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchItems = async (itemURL, id) => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/${itemURL}/${id}`);
                setOwner(res.data);
            } catch (error) {
                console.error(error);
                setOwner(null);
            }
        };

        fetchItems('get-username', ownerId);
    }, [ownerId]);

    if (!owner) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        console.log('uid', userId, ownerId)

        try {
            // Replace userId and ownerId with the actual variables if they are props or state values
            const res = await axios.get(`http://127.0.0.1:8000/chats/create-or-get-chatroom/${userId}/${ownerId}/`);
            
            // Extract the room ID from the response data
            const room = res.data;
            
            // Log the room ID for debugging purposes
            console.log("room", room);
            const otherUser = room.users[0].username;
            console.log(otherUser)
        
            // Navigate to the chat room
            navigate(`/chat/${room.room_id}/${otherUser}`);
        } catch (error) {
            // Handle the error and log it
            console.error("Error fetching chatroom:", error);
            
            // Optional: Show a user-friendly message if the request fails
            alert("Unable to create or get the chat room. Please try again later.");
        }
        
    }

    return (
        <>
            <div className='flex flex-col p-2'>

                <div className="flex justify-center items-center w-full min-h-10 mx-4 rounded-lg shadow-md p-3 ">
                    {/* <img src={avatar} alt="Profile" className="h-16 w-16 rounded-full" /> */}
                    <div className="ml-4 mx-4 flex flex-col">
                        <div className='flex flex-row items-center'>
                            <UserCircle2 height={50} className='mx-3'/>
                            <h2 className="text-2xl font-semibold mb-2">{owner.first_name}</h2>
                        </div>
                        
                        <h2>Send Mail</h2>
                        <button
                            className="m-3 text-center mt-6 px-6 py-3 text-lg font-semibold bg-teal-500 text-white hover:bg-teal-700 rounded-xl"
                            onClick={handleSubmit}
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerInfo
