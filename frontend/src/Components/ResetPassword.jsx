// pages/ResetPassword.js

import { React } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL + "/api/resetPassword";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newpassword = e.target.newpassword.value;
    console.log(newpassword)
    const confirmpassword = e.target.confirmpassword.value;
    if (newpassword !== confirmpassword)
      toast.error("Passwords do not match !");
    const formData = { id: id, token: token, password: newpassword };
    const res = await axios.post(URL, formData);
    const data = res.data;
    if (data.success === true) {
      toast.success(data.message);
      navigate("/login");
    } else toast.error(data.message);
  };

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Reset Password
        </h5>
        <form className="w-full flex max-w-md flex-col gap-4"onSubmit={handleResetPassword}>
          <div>
            <div className="mb-2 block">
              <label htmlFor="newpassword" className="text-sm font-medium required">
                New Password
              </label>
            </div>
            <input id="newpassword" name="newpassword" type="password" placeholder="New Password" required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="confirmpassword" className="text-sm font-medium required">
                Confirm Password
              </label>
            </div>
            <input id="confirmpassword" name="confirmpassword" type="password" placeholder="Confirm Password" required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            />
          </div>
          <div className="mt-2 block">
            <button type="submit" className="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800">
              Submit
            </button>
          </div>
          </form>
          <p className="text-center text-sm text-gray-500">
            Not yet registered?{" "}
            <Link to="/register" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Register Here
            </Link>
          </p>
        
      </div>
    </div>
  );
};

export default ResetPassword;
