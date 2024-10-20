import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Loginpage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible)
    }
  
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
  
    const handleSignup = () => {
      navigate('/signup')
    }
  
    const user = {
      login_route: "/user/login"
    }
    
    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: user.login_route,
                data,
            });
            toast.success("Logged in successfully")
            console.log(response, "====response");
            
            navigate('/filter');
        } catch (error) {
            toast.error("Failed to Login")
            console.log(error);
        }
    };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 md:w-96 sm:w-auto shadow-2xl mx-auto">
        <form className="card-body items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control items-center">
            <h2 className="text-xl font-bold font-sans">Log In</h2>
            <div className="divider divider-primary w-64 mt-1"></div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email Id"
              className="input input-bordered w-64" {...register("email")}
              required
            />
            <div className="relative w-64">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="input input-bordered w-full" {...register("password")}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <svg
                    xmlns="https://www.svgrepo.com/show/246493/visibility-eye.svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12l-3-3m0 6l3-3m4.5-5.5A9.978 9.978 0 0112 2a9.978 9.978 0 00-7.5 3.5M3 12a9.978 9.978 0 003.5 7.5M12 22a9.978 9.978 0 007.5-3.5M21 12a9.978 9.978 0 00-3.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="https://www.svgrepo.com/show/491289/not-visible.svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.5a9.978 9.978 0 017.5 3.5m-3.5 5A9.978 9.978 0 0112 19.5M3 12a9.978 9.978 0 003.5 7.5M12 19.5a9.978 9.978 0 01-7.5-3.5M21 12a9.978 9.978 0 00-3.5-7.5m0 0L12 12l-6 6"
                    />
                  </svg>
                )}
              </span>
            </div>
            </div>
          <div className="text-left">
            <p className="font-semibold">
              New User? Then<a className="hover:underline" onClick={handleSignup}> Signin</a>
            </p>
          </div>
          <button className="btn btn-wide bg-slate-600 bg-opacity-50">
            Log In
          </button>
          <ToastContainer
                 position="bottom-right"
                 autoClose={5000}
                 hideProgressBar={false}
                 newestOnTop={false}
                 closeOnClick
                 rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/>
        </form>
      </div>
      
    </div>

  )
}
