import React from 'react'

function InfoCard(props) {
    const { digit, text } = props
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center flex-col p-3">
                <h1 className="m-1 font-sans font-bold text-gray-700 text-3xl" >
                    {digit}
                </h1>
                <p className='text-md font-light text-gray-500'>{text}</p>
            </div>
        </div>
    )
}

export default InfoCard
