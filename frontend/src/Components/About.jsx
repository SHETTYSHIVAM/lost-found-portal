import React from 'react';

function About() {
  return (
    <section className="container mx-auto px-4 py-8 md:w-7/12 lg:w-6/12">
      <header className="mb-6">
        <h1 className="text-3xl text-gray-900 mb-3">About Us</h1>
        <h4 className="text-lg text-gray-800 mb-2 font-sans">Welcome to the College Lost and Found Portal,</h4>
      </header>

      <article className="mb-6">
        <p className="text-justify text-gray-700 mb-4">
          At SMVITM, we understand the frustration and inconvenience that comes with losing personal belongings. Whether it's a misplaced textbook, a lost phone, or a forgotten calculator, our goal is to make the process of recovering lost items as seamless and efficient as possible.
        </p>
      </article>

      <article className="mb-6">
        <h4 className="text-lg text-gray-800 mb-2 font-sans">Our Mission</h4>
        <p className="text-justify text-gray-700">
          Our mission is to create a safe and user-friendly platform that connects individuals who have lost their belongings with those who have found them. By fostering a community of honesty and responsibility, we aim to ensure that lost items are returned to their rightful owners quickly and efficiently.
        </p>
      </article>

      <article className="mb-6">
        <h4 className="text-lg text-gray-800 mb-2 font-sans">How It Works</h4>
        <div className="mb-4">
          <h5 className="text-md text-gray-700 font-semibold">Report a Lost Item:</h5>
          <p className="text-justify text-gray-700">
            If you have lost an item, simply log into our portal and fill out a detailed report. Provide as much information as possible, including a description of the item, the date and location it was lost, and any unique identifiers. This information will be added to our database, making it easier for finders to identify and return your item.
          </p>
        </div>
        <div className="mb-4">
          <h5 className="text-md text-gray-700 font-semibold">Report a Found Item:</h5>
          <p className="text-justify text-gray-700">
            If you have found an item on campus, you can report it through our portal. Provide a detailed description of the found item and the location where it was discovered. This information will be matched with existing reports of lost items, and the owner will be notified.
          </p>
        </div>
        <div className="mb-4">
          <h5 className="text-md text-gray-700 font-semibold">Contact the Owner:</h5>
          <p className="text-justify text-gray-700">
            When a match is found between a lost item report and a found item report, our system will facilitate contact between the finder and the owner. This ensures that the item can be returned promptly and securely.
          </p>
        </div>
      </article>

      <article className="mb-6">
        <h4 className="text-lg text-gray-800 mb-2 font-sans">Why Use Our Portal?</h4>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2"><strong>Efficiency:</strong> Our streamlined reporting and matching system ensures quick and accurate identification of lost and found items.</li>
          <li className="mb-2"><strong>Security:</strong> All communications and transactions through our portal are secure, ensuring privacy and safety for all users.</li>
          <li className="mb-2"><strong>Community:</strong> By participating in our Lost and Found Portal, you are contributing to a culture of trust and integrity within our college community.</li>
        </ul>
      </article>

      <article className="mb-6">
        <h4 className="text-lg text-gray-800 mb-2 font-sans">Get Involved</h4>
        <p className="text-justify text-gray-700">
          We encourage all students, faculty, and staff to utilize this portal. Whether you've lost an item or found something that doesn't belong to you, your participation is crucial in helping maintain the integrity of our community.
        </p>
        <article className="text-justify text-red-500">
          <strong>Note:</strong>
          <br/>
          Love, Lost Hope, Happiness, your ex etc will not be found in this portal.
        </article>
      </article>

      <article className="mb-6">
        <h4 className="text-lg text-gray-800 mb-2 font-sans">Contact Us</h4>
        <p className="text-justify text-gray-700">
          For any questions or assistance, please reach out to our support team at <a href="mailto:cws.django3141@gmail.com" className="text-blue-500 underline">cws.django3141@gmail.com</a>. We are here to help you navigate the process and ensure that lost items are returned to their rightful owners.
        </p>
        <p className="text-justify text-gray-700 mt-4">
          Thank you for being a part of this initiative. Together, we can make our college a place where honesty and responsibility thrive.
        </p>
        <p className="text-justify text-gray-700 mt-4">Sincerely,</p>
        <p className="text-justify text-gray-700">The SMVITM Lost and Found Team</p>
      </article>
    </section>
  );
}

export default About;
