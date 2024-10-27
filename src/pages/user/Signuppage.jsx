import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const Signuppage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [lcfrontpic, setLcfrontpic] = useState(null) 
  const [lcbackpic, setLcbackpic] = useState(null)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const user = {
    signup_route: "/user/signup"
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 900));
      const formData = new FormData();

      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("dob", data.dob)
      formData.append("password", data.password)

      if (lcfrontpic) {
        formData.append('lcfrontpic', lcfrontpic)
      }
      if (lcbackpic) {
        formData.append('lcbackpic', lcbackpic)
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }

      const response = await axiosInstance({
        method: "POST",
        url: user.signup_route,
        data: formData,
        headers: { 'Content-Type':'multipart/form-data' }
      })
      toast.success("User signned up successfully")
      navigate("/user/dateplace");
    } catch(error) {
      toast.error("Failed to Sign up")
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0]
    setFile(file)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 md:w-96 sm:w-auto shadow-2xl mx-auto">
        <form className="card-body items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control items-center">
            <h2 className="text-xl font-bold font-sans">Sign up</h2>
            <div className="divider divider-primary w-64 mt-1"></div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-64" {...register("name")}
              required
            />
            <input
              type="email"
              placeholder="Email Id"
              className="input input-bordered w-64" {...register("email")}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number" {...register("phone")}
              className="input input-bordered w-64"
              required
            />
            <label className='text-sm font-semibold'>Date of Birth</label>
            <input
              type="date"
              placeholder="dob"
              className="input input-bordered w-64" {...register("dob")}
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
            <p className="text-sm font-semibold">
              License front & back side images
            </p>
            <div className="flex w-full flex-col lg:flex-row justify-center">
              <div className="flex flex-col items-center">
                <label htmlFor="image1" className="cursor-pointer">
                  <img
                    src="/assets/placeholder-image.png"
                    alt=""
                    className="w-10 h-10 object-cover bg-slate-100" 
                  />
                </label>
                <input
                  id="image1"
                  type="file"
                  accept="image/*"
                  className="hidden" onChange={(e) => setLcfrontpic(e.target.files[0])}
                />
              </div>

              <div className="divider lg:divider-horizontal"></div>

              <div className="flex flex-col items-center">
                <label htmlFor="image2" className="cursor-pointer">
                  <img
                    src="/assets/placeholder-image.png"
                    alt=""
                    className="w-10 h-10 object-cover bg-slate-100" 
                  />
                </label>
                <input
                  id="image2"
                  type="file"
                  accept="image/*"
                  className="hidden" onChange={(e) => setLcbackpic(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="text-left">
            <p className="font-semibold">
              Existing User? Then<a className="hover:underline" onClick={handleLogin}> Signin</a>
            </p>
          </div>
          <button className="btn btn-wide bg-slate-600 bg-opacity-50" disabled={isLoading}>
            {isLoading ? (<span className="loading loading-dots loading-md"></span>) : ("Sign Up")}
          </button>
        </form>
      </div>
    </div>
  )
}
