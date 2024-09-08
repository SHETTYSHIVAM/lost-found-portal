import React, { useState, useEffect } from 'react'
import Card from './Card'
import Sidebar from './SideBar/SideBar'
import InfoCard from './InfoCard/InfoCard'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import { useAuth } from '../context/AuthContext'


const fetchItems = async (itemURL, id = '') => {
    try {
        const res = await axiosInstance.get(`${itemURL}/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const lost = "lost-items"
const found = "found-items"

function Home() {
    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        const getLostItems = async () => {
            const data = await fetchItems(lost);
            const current_items = data.filter(item => item.is_found == false);
            setLostItems(current_items);
        };

        const getFoundItems = async () => {
            const data = await fetchItems(found);
            const current_items = data.filter(item => item.is_returned == false);
            setFoundItems(current_items);
            console.log(foundItems)
        };

        getLostItems();
        getFoundItems();
    }, []);

    
    return (
        <>
            <form className="max-w-md mx-auto mb-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className='my-4 flex flex-row justify-center p-3 py-5 shadow-md'>
                <Link
                    to="/report-lost"
                    className='py-2 px-3 mr-2 bg-gray-800 rounded-full border-r-2 text-white'
                >Report Lost Item</Link>
                <Link
                    to="/report-found"
                    className='py-2 px-3 ml-2 bg-gray-800 rounded-full border-l-2 text-white'
                >Report Found Item</Link>
            </div>
            <div className='my-4 flex flex-col p-3 py-5 shadow-md'>
                <h1 className='text-3xl text-center font-sans text-gray-600'>Stats</h1>
                <div className='w-full h-screen/5 flex flex-row justify-evenly'>

                    <InfoCard digit={5} text={"Lost Items Reported"} />
                    <InfoCard digit={4} text={"Found Items Reported"} />
                    <InfoCard digit={4} text={"Items Returned Back"} />
                    <InfoCard digit={7} text={"Donations Given"} />

                </div>
            </div>

            <h2 className="text-2xl font-semibold my-6 text-center">Lost Items</h2>
            <hr className='bg-gradient-to-r from-white via-gray-500 to-white m-3 p-0.5 mx-5 rounded-full'></hr>
            <div className="flex sm:flex-col justify-evenly flex-wrap md:flex-row border-x-2 gap-6 p-3">

                {lostItems.map((item, index) => (


                    <Card item={item} key={index} type="lostitems" />

                ))}

            </div>
            <div className='mt-8'>
                <h2 className="text-2xl font-semibold mt-4 mb-2 text-center">Found Items</h2>
                <hr className='bg-gradient-to-r from-white via-gray-500 to-white m-3 p-0.5 mx-5 rounded-full'></hr>
                <div className="flex sm:flex-col justify-evenly flex-wrap md:flex-row border-x-2 gap-6 p-3">

                    {foundItems.map((item, index) => (
                            <Card item={item} key={index} type="founditems" />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
