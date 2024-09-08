import React from 'react'
import { Link } from 'react-router-dom';

export function Card({item, type}) {
  //const { id, name, image, desc, keywords, date_lost, is_found, owner_id }
  // JSON.stringify(data);
  // const json = JSON.stringify(json)
  // const name=json.name
  // const image=json.image
  // const desc=json.desc
  // const keywords=json.keywords
  // const date_lost=json.date_lost
  // const is_found=json.is_found
  // const owner_id=json.owner_id

  const itemURL = type === "lostitem" ? "lost-items" : "found-items"
  return (
    <>
    <Link to={`/list-detail/${itemURL}/${item.id}`} key={item.id}>
     <div className="flex flex-col h-[600px] w-[300px] p-2 justify-center items-center border-gray-700 border-2">
            <img
              src={`http://localhost:8000${item.image}`}
              alt={item.name}
              className="m-1 max-h-[200px] w-auto mx-5"
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {item.name} &nbsp;
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                {item.description}
              </p>
              <p className="mt-3 text-sm text-gray-600">
                <strong>Date Lost: </strong> {new Date(item.date_lost).toLocaleString()}
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Contact Finder
              </button>
            </div>
         
        
        </div>
        </Link>
    </>
  )
}
