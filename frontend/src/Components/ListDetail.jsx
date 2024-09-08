import React from 'react'
import axiosInstance from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
function ListDetail() {

    const {type, id} = useParams();
    const [item, setItem] = useState(null);
    console.log('ltype',type)
    const itemURL = type === "lost-items" ? "lost-items" : "found-items"

    const navigate = useNavigate()

    const refreshItems = () => {
        axiosInstance.get(`/${itemURL}/`)
          .then((res) => {
            setItem(res.data);
          })
          .catch(console.error);
      };

    useEffect(() => {
        const fetchItems = async (itemURL, id) => {
            try {
                const res = await axiosInstance.get(`http://127.0.0.1:8000/api/${itemURL}/`)//${id}`);
                setItem(res.data);
            } catch (error) {
                console.error(error);
                setItem(null);
            }
        };
        
        fetchItems('lost-items', id);
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }
    console.log(item)
    const current_item = item.find(i => i.id === parseInt(id));


    const DeleteItem = async (id) => {
        try {
            await axiosInstance.delete(`http://localhost:8000/api/${itemURL}/${id}`);
            refreshItems();
            toast.success("Item Deleted Successfully")
            navigate('/')
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error("Error deleting Item")
        }
    }
    
    const UpdateItem = async (id, itemStatus) => {
        try {
            // Build the item object dynamically based on the provided fields
            let item = {};
            if (itemStatus !== undefined) item.itemStatus = itemStatus;
            const response = await axiosInstance.patch(`/${itemURL}/${id}/`, item);
            console.log('Update response:', response);
            refreshItems();
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    }
    


    return (
        <>
            <div className="flex flex-row justify-around">
                <div className="flex h-full md:h-screen/2 w-full md:w-1/3">
                    <img src={`http://localhost:8000${current_item.image}`} className="rounded-xl" alt="Lost item" />
                </div>
                <div className="flex flex-col p-6 bg-gray-100 rounded-xl">
                    <h1 className="mb-6 text-3xl">{current_item.name}</h1>
                    <p className="text-gray-500 mb-2"><strong>{type === "lostitem" ? " lost " : " found "} At: </strong>{current_item.place}</p>
                    <p className="text-gray-500 mb-2"><strong>{type === "lostitem" ? " Owner " : " Finder "}: {current_item.owner} </strong></p>
                    <p className="text-gray-700">
                        <strong className="text-gray-500">Description: </strong><br />
                        {current_item.description}
                    </p>
                    <button onClick={() => DeleteItem(id)}  className="m-3 text-center mt-6 px-6 py-3 text-lg font-semibold bg-teal-500 text-white hover:bg-teal-700 rounded-xl">Delete Item</button>
                    <button onClick={() => UpdateItem(id, true)}  className="m-3 text-center mt-6 px-6 py-3 text-lg font-semibold bg-teal-500 text-white hover:bg-teal-700 rounded-xl">
                    {type=="lostitem" ? " I got the item " : " I returned the item " }
                    </button>
                </div>
            </div>
        </>
    )
}

export default ListDetail
