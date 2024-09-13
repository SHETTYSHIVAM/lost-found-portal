# Lost and Found Website
## Description
 A Lost and Found portal for college with a Django backend and a React frontend. 
 If you have lost an item, simply log into our portal and fill out a detailed report. Provide as much information as possible, including a description of the item, the date and location it was lost, and any unique identifiers. This information will be added to our database, making it easier for finders to identify and return your item.
 If you have found an item on campus, you can report it through our portal. Provide a detailed description of the found item and the location where it was discovered. This information will be matched with existing reports of lost items, and the owner will be notified.

 The portal includes a real-time chat interface allowing users to communicate directly. Both the finder and the owner can initiate a chat to coordinate the return of the item.


## Table of Contents
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm
- Django 3.2+
- Django REST framework
- REST framework simplejwt
- corsheaders

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SHETTYSHIVAM/lost-found-portal.git
   ```
   
2. Navigate to backend directory
   ```bash
   cd lost-found-portal/backend
   ```

3. Create a virtual environment
   ```bash
   python -m venv venv
   ```
   
4. Activate the virtual environment
   ```bash
   venv\Scripts\activate
   ```

5. Install Dependencies
   ```bash
   pip install -r requirements.txt
   ```

6. Make migrations
   ```bash
   python manage.py makemigrations
   ```
7.  Apply migrations
   ```bash
   python manage.py migrate
   ```
8. Run the backend server (development)
   ```bash
   python manage.py runserver
   ```
   
### Frontend Setup

1. Navigate to frontend directory
   ```bash
   cd ../frontend
   ```
   
2. Install node_modules
   ```bash
   npm install
   ```
   
3. Install Dependencies
   ```bash
   npm i react-router-dom
   npm i lucide-react
   npm i react-toastify
   ```
   
4. Start the frontend Server
   ```bash
    npm run dev
   ```
   
## Usage
1. Run the backend server (development)
   ```bash
   cd backend
   python manage.py runserver
   ```
   
2. Start the frontend Server (development)
   ```bash
    cd frontend
    npm run dev
   ```
   
3. Access the application
   Open your browser and navigate to `http://localhost:5173/` to access the React frontend.

This README includes sections for setting up both the backend and frontend, as well as detailed instructions for installing dependencies and running the development servers.