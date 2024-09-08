import React from 'react';
import { Link } from 'react-router-dom';
function Donate() {
    return (
        <div className='flex flex-col md:flex-row justify-center'>
            <div className='flex h-full md:h-screen w-full md:w-1/3'>
                <img 
                    src="https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Children playing"
                    className='w-full h-full object-cover'
                />
            </div>
            <section className="container mx-5 py-8 md:w-1/2">
                <h1 className='text-3xl text-gray-900 font-sans mb-2'>परोपकारार्थं इदं शरीरं</h1>
                <p className='text-md font-semibold my-4'>This body is for the service of others</p>
                <h1 className='text-xl text-gray-800 mb-2 font-sans'>Donations for orphanages, rehabilitation centres</h1>
                <article className="mb-6">
                    <p className="text-justify text-gray-700 text-lg mb-4">
                        If you have compassion for abandoned or orphaned children, you may help by making a little online donation to the orphanages. Of course, you may give money online to an orphanage, but there are other ways you can support as well.
                    </p>
                    <p className="text-justify text-lg text-gray-700 mb-4">
                        <strong>Give away toys and clothing:</strong> Growing kids usually require toys and clothes, but orphans may not have the money to meet their demands. Nonetheless, you may assist them by giving them these items, particularly during the holiday season, to help them experience the warmth and love of a family. You can also support their school supplies, including books and stationery, as well as their uniforms, and see them develop into self-assured teenagers.
                    </p>
                </article>
                <Link
                to={"https://www.pmf.ngo/"}
                className='bg-orange-600 text-white text-xl p-3 rounded-lg hover:bg-orange-300'
                >
                    Donate Now
                </Link>
            </section>
        </div>
    );
}

export default Donate;
