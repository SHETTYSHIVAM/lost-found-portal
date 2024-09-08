import React from 'react'
import SearchBox from '../SearchBox'
import {BellRing, Info, MailIcon, PhoneCall} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SidebarOpen } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r flex-wrap bg-white">
      <div className="mt-1 flex flex-col ml-3 p-3">
        <div className='flex flex-row-reverse my-3'>
        <SidebarOpen height={20} width={20}/>
        </div>
        <SearchBox/>
        <nav className="space-y-6 mr-8">
          <div className="space-y-3 ">
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="#"
            >
              <span className="mx-2 text-sm font-medium">Report a Lost Item</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="#"
            >
              <span className="mx-2 text-sm font-medium">Report a Found Item</span>
            </Link>
          </div>
          <div className="space-y-3 ">
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="#"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </Link>
            </div>

            <div className="sm:flex space-y-3 md:hidden">

            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="/about"
            >
              <Info className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">About Us</span>
            </Link>

            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="/contact"
            >
              <MailIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Contact Us</span>
            </Link>
        
          </div>
        </nav>
      </div>
    </aside>
  )
}
