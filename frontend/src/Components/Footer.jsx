import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <footer className="bg-gray-900 static mt-4 mb-0 flex flex-col md:flex-row justify-between">
        <div className="mr-10 text-white flex flex-col ">
            <div className="mr-6">
                <h3 className="text-white mb-3 font-extrabold text-xl">
                Lost & Found
                </h3>
                <p className="text-justify text-wrap mr-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aliquam officia illum cupiditate eum id, ea esse maxime nesciunt quas quasi nulla quam reprehenderit ratione modi itaque similique deleniti tenetur nihil aspernatur dolores quia saepe! Libero doloremque itaque voluptatibus aliquid!
                </p>
            </div>
        </div>
        <div className="m-6 flex flex-row justify-evenly">
            <div className="m-3 mr-10 text-white">
                <h3 className="text-white mb-4 text-xl">
                    Menu
                </h3>
                <div className="mb-3">
                    About Us
                </div>
                <div className="mb-3">
                    Home
                </div>
            </div>

            <div className="m-3 mr-10 text-white flex flex-col">
                <h3 className="text-white text-xl">
                    Contact
                </h3>
                <div className="m-3">
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer
