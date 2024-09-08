import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import axios from 'axios';

function ItemDetails() { // type lostitem founditem
    const { type, id } = useParams();
    console.log(type)
    const [item, setItem] = useState(null);
    const itemURL = type === "lost-items" ? "lost-items" : "found-items"

    

    useEffect(() => {
        const fetchItems = async (itemURL, id) => {
            try {
                const res = await axiosInstance.get(`/${itemURL}/${id}`);
                setItem(res.data);
            } catch (error) {
                console.error(error);
                setItem(null);
            }
        };
        
        fetchItems(itemURL, id);
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }
    console.log(item)
    // const item = item.find(i => i.id === parseInt(id));
    return (
        <div className="flex flex-row justify-around">
            <div className="flex h-full md:h-screen/2 w-full md:w-1/3">
                <img src={`http://localhost:8000${item.image}`} className="rounded-xl" alt="Lost item" />
            </div>
            <div className="flex flex-col p-6 bg-gray-100 rounded-xl">
                <h1 className="mb-6 text-3xl">{item.name}</h1>
                <p className="text-gray-500 mb-2"><strong>{type === "lost-items" ? " lost " : " found "} At: </strong>{item.place}</p>
                <p className="text-gray-500 mb-2"><strong>{type === "lost-items" ? " Owner " : " Finder "}: {item.owner} </strong></p>
                <p className="text-gray-700">
                    <strong className="text-gray-500">Description: </strong><br />
                    {item.description}
                </p>
                <Link to={`/conversation/${type === "lost-items" ? item.owner : item.finder }`} className="m-3 text-center mt-6 px-6 py-3 text-lg font-semibold bg-teal-500 text-white hover:bg-teal-700 rounded-xl">Contact {type === "lost-items" ? " Owner " : " Finder "}</Link>
            </div>
        </div>
    );
}

export default ItemDetails;
