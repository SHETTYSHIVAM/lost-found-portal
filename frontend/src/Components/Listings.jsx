import React from 'react'
import Card from './Card2'
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from "react";
import axiosInstance from '../utils/axios';

function Listings() {
    const { isLoggedIn, setIsLoggedIn, name, userId, setUserId, setName, email, setEmail, handleLogout } = useAuth();

    const fetchItems = async (itemURL) => {
        try {
            const res = await axiosInstance.get(`http://localhost:8000/api/${itemURL}/`);
            return res.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const lost = "lost-items"
    const found = "found-items"

    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        const getLostItems = async () => {
            const data = await fetchItems(lost);
            const current_items = data.filter(item => item.owner === userId);
            setLostItems(current_items);
        };

        const getFoundItems = async () => {
            const data = await fetchItems(found);
            const current_items = data.filter(item => item.finder === userId);
            setFoundItems(current_items);
        };

        getLostItems();
        getFoundItems();
    }, []);

    console.log(userId)

    return (
        <>
            <h2 className="text-2xl font-semibold my-6 text-center">Lost Items</h2>
            <hr className='bg-gradient-to-r from-white via-gray-500 to-white m-3 p-0.5 mx-5 rounded-full'></hr>
            <div className="flex sm:flex-col justify-evenly flex-wrap md:flex-row border-x-2 gap-6 p-3">
                {lostItems.length === 0 ? (
                    <h1 className='flex justify-center items-center text-lg'>No Lost Items Listings</h1>
                ) : (
                    lostItems.map((item, index) => (
                            <span>
                                <Card item={item} key={index}  type="lostitem"/>
                            </span>
                    ))
                )}

            </div>
            <div className='mt-8'>
                <h2 className="text-2xl font-semibold mt-4 mb-2 text-center">Found Items</h2>
                <hr className='bg-gradient-to-r from-white via-gray-500 to-white m-3 p-0.5 mx-5 rounded-full'></hr>
                <div className="flex sm:flex-col justify-evenly flex-wrap md:flex-row border-x-2 gap-6 p-3">

                    {foundItems.length === 0 ? (
                        <h1 className='flex justify-center items-center text-lg'>No Found Items Listings</h1>
                    ) : (
                        foundItems.map((item, index) => (
                                <span>
                                    <Card item={item} key={index}  type="founditem" />
                                </span>
                        ))
                    )}
                </div>
            </div>
        </>


    )
}

export default Listings
