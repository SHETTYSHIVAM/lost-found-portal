import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../utils/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function FoundItemReportForm() {
  const itemURL = "found-items";
  const [itemName, setItemName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState('')
  const [desc, setDesc] = useState("")
  const [place, setPlace] = useState("")
  const [date, setDate] = useState("")
  const [itemStatus, setItemStatus] = useState(false)
  const [response, setResponse] = useState(null)

  const { isLoggedIn, userId } = useAuth()
  console.log('userId', userId)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin")
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('finder', parseInt(userId, 10))
    formData.append('name', itemName)
    formData.append('description', desc)
    formData.append("place", place)
    formData.append("date_found", date)
    formData.append("is_returned", itemStatus)
    if (image) {
      formData.append('image', image)
    }
    try {
      const res = await axiosInstance.post(`http://localhost:8000/api/${itemURL}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setResponse(res.data)
      toast.success(res.data)
      navigate("/profile")
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mx-auto my-2 md:my-4 max-w-4xl">
      <div className="overflow-hidden rounded-xl shadow">
        <div className="flex justify-center items-center">
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mt-4 w-full">
                      <h1 className='text-2xl mb-6 font-semibold text-gray-900'>
                        Found Item Report Form
                      </h1>
                    </div>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3 id="contact-info-heading" className="text-lg font-semibold text-gray-900">
                          Your Info
                        </h3>

                        <div className="mt-4 w-full">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                            Full Name
                          </label>
                          <input className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Enter your name" id="name"></input>
                        </div>
                        <div className="mt-4 w-full">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <input className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="email" placeholder="abc@sode-edu.in" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                          </div>
                        </div>
                      </div>

                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>

                        <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">

                          <div className="col-span-2 sm:col-span-3">
                            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                              Date Found
                            </label>
                            <div className="mt-1">
                              <input type="date" name="expiration-date" id="expiration-date" autoComplete="cc-exp" className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" value={date} onChange={(e) => { setDate(e.target.value) }} />
                            </div>

                            <div className="mt-6 w-full">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="place">
                                Where did you find the Item
                              </label>
                              <input className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Enter Place" id="place" value={place} onChange={(e) => { setPlace(e.target.value) }}></input>
                            </div>

                            <div className="mt-6 w-full">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                                Name of the Item
                              </label>
                              <input className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="NoteBook" id="name" value={itemName} onChange={(e) => { setItemName(e.target.value) }}></input>
                            </div>

                            <div className="mt-6 w-full">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
                                Picture of the Item
                              </label>
                              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="image" onChange={(e) => { setImage(e.target.files[0]) }}></input>
                            </div>

                            <div className="mt-6 w-full">
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="description">
                                Describe The Item
                              </label>
                              <textarea className="flex h-auto min-h-20 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="The Item is a ..." id="description" value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
                            </div>

                          </div>

                        </div>
                      </div>
                      <hr className="my-8" />

                      <div className="mt-10">
                        <div className="mt-6 flex items-center">
                          <input id="same-as-shipping" name="same-as-shipping" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                          <div className="ml-2">
                            <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                              Provided Information is true to the best of my knowledge
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
