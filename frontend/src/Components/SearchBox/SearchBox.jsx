import React from 'react'

export function SearchBox() {
  return (
    <div className="w-full md:w-auto">
      <label
        className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="name"
      >
        Name
      </label>  
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Search for an Item"
        id="name"
      ></input>
      <button
        type="button"
        className="rounded-md bg-black px-3 m-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Search
      </button>
    </div>
  )
}