import React, { useState, useEffect } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios'

export default function SignUp() {
  const { isLoggedIn, setIsLoggedIn, setName, setUserId, setEmail } = useAuth();

  const URL = import.meta.env.VITE_API_URL+"/api/register";
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [Name, SetName] = useState("")
  const [email1, setEmail1] = useState("")
  const [password, setPassword] = useState("")
  
  useEffect(() => {
    if (isLoggedIn) navigate("/profile");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const formData = {
      username: name,
      email: email,
      password: password
    }

    try {
      const res = await axiosInstance.post(URL, formData);
      const data = res.data;
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(true);
        setName(name);
        setEmail(email);
        // Fetch current user data
        const userRes = await axiosInstance.get('current-user/', {
          headers: {
            'Authorization': `Bearer ${data.access}`
          }
        });

        const userData = userRes.data;
        setUserId(userData.id)
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  }

  const validatePassword = (pass) => {
    let flag = 1
        if (pass.length < 8) {
          setErrorMessage('Password must be at least 8 characters long');
          flag = 0
        }
        if (!/[0-9]/.test(pass)) {
          setErrorMessage('Password must contain at least one number');
          flag = 0
        }
        if (!/[A-Z]/.test(pass)) {
          setErrorMessage('Password must contain at least one uppercase letter');
          flag = 0
        }
        if (!/[!@#$%^&*]/.test(pass)) {
          setErrorMessage('Password must contain at least one special character');
          flag = 0
        }
        if(flag==1){
          setErrorMessage('')
        }

  }
  return (
    <section>
      <div className="flex justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link
              to="/signin"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit} method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  User Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={Name}
                    onChange={(e) => SetName(e.target.value)}
                    placeholder="User Name"
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <div className='flex flex-row'>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      validatePassword(e.target.value)
                    }}
                    placeholder="Password"
                    id="password"
                  ></input>
                  <button
                    type="button"
                    className="rounded-r-lg h-10 bg-gray-800 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                  >
                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4"/> }
                  </button>
                  </div>
                  <div className='bg-inherit text-red-600'>
                    {errorMessage}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-teal-500 px-3.5 py-2 font-semibold leading-7 text-white hover:bg-black/80 active:bg-gray-400"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
