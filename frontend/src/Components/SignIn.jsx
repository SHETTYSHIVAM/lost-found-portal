import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import axiosInstance from '../utils/axios';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { isLoggedIn, setIsLoggedIn, setUserId, setName, setEmail, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, password };
    try {
      const res = await axiosInstance.post(`token/`, formData);
      const data = res.data;

      if (data.access) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // Fetch current user data
        const userRes = await axiosInstance.get('current-user/', {
          headers: {
            'Authorization': `Bearer ${data.access}`
          }
        });
        
        const userData = userRes.data;
        toast.success('Login successful');
        handleLogin({
          userId: userData.id,    
          name: userData.username,
          email: userData.email,
          accessToken: data.access,
          refreshToken: data.refresh,
        });

        navigate('/profile');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error('Login failed', error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/profile');
  }, [isLoggedIn, navigate]);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-15">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="text-base font-medium text-gray-900">
                  User Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="User name"
                    id="username"
                    name="username"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Link to="/forgotpassword" className="text-sm font-semibold text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2 ">
                  <div className="flex flex-row">
                    <input
                      className="flex h-10 w-full rounded-l-md border-r-none border-gray-300 bg-transparent pl-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      id="password"
                      name="password"
                    />
                    <button
                      type="button"
                      className="rounded-r-lg h-10 bg-gray-800 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-teal-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-teal-800"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
