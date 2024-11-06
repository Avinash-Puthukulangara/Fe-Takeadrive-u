import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const MyProfile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editableProfile, setEditableProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    userpic: null,
  })
  const navigate = useNavigate()

  const user = {
    profile_route: '/user/profile',
    update_route: '/user/edituser',
    delete_route: '/user/deleteuser',
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('token')
      if (!token) {
        setError('No authentication token found.')
        setLoading(false)
        return
      }
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: user.profile_route,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        setUserProfile(response.data.userData)
        setEditableProfile({
          name: response.data.userData.name,
          email: response.data.userData.email,
          phone: response.data.userData.phone,
          dob: response.data.userData.dob,
          userpic: response.data.userData.userpic,
        })
      } catch (error) {
        setError('Failed to load profile')
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [user.profile_route])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditableProfile({ ...editableProfile, [name]: value })
  }

  const handleFileChange = (e) => {
    setEditableProfile({ ...editableProfile, userpic: e.target.files[0] })
  }

  const updateProfile = async () => {
    try {
      const token = Cookies.get('token')
      const formData = new FormData()
      formData.append('name', editableProfile.name)
      formData.append('email', editableProfile.email)
      formData.append('phone', editableProfile.phone)
      formData.append('dob', editableProfile.dob)
      if (editableProfile.userpic) {
        formData.append('userpic', editableProfile.userpic)
      }

      const response = await axiosInstance({
        method: 'PUT',
        url: `${user.update_route}/${userProfile._id}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })

      if (response.data.success === 'true') {
        toast.success('Profile updated successfully!')
        setUserProfile(response.data.data)
      }
    } catch (error) {
      toast.error('Error updating profile')
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm('Do you want to delete profile?')
    if (!confirmDelete) return
    try {
      const token = Cookies.get('token')
      const response = await axiosInstance({
        method: 'DELETE',
        url: `${user.delete_route}/${userProfile._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      if (response.status === 200) {
        toast.success('Successfully deleted profile.')
        navigate('/')
      }
    } catch (error) {
      toast.error('Error deleting profile')
      console.log(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="hero bg-base-500 min-h-screen md:p-6">
      <div className="card bg-teal-400 shadow-2xl mx-auto flex flex-col p-6 md:w-full sm:w-96">
        <h2 className="text-2xl font-bold font-serif ml-4">My Profile</h2>
        <div className="flex w-full flex-col">
          <div className="divider divider-error -mt-1"></div>
        </div>
        {userProfile ? (
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center md:w-1/2 mb-4">
              <div className="avatar flex sm:justify-center items-center mb-4">
                <div className="w-24 rounded-xl">
                  <figure>
                    <img
                      src={
                        editableProfile.userpic &&
                        editableProfile.userpic instanceof File
                          ? URL.createObjectURL(editableProfile.userpic)
                          : userProfile.userpic
                      }
                      alt="User Profile"
                      className="w-52 h-52 object-fill rounded-md"
                    />
                  </figure>
                </div>
              </div>
              <input type="file" name="userpic" onChange={handleFileChange} />
            </div>
            <div className="flex flex-col md:w-1/2 md:mt-0 -ml-32 p-5">
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Name:
                  <input
                    type="text"
                    name="name"
                    className="grow"
                    value={editableProfile.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Email:
                  <input
                    type="email"
                    name="email"
                    className="grow"
                    value={editableProfile.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Mobile:
                  <input
                    type="text"
                    name="phone"
                    className="grow"
                    value={editableProfile.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">
                  DOB:
                  <input
                    type="text"
                    name="dob"
                    className="grow"
                    value={editableProfile.dob}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-ghost btn-md bg-teal-300 border-1 border-black"
                  onClick={updateProfile}
                >
                  Update Profile
                </button>
                <button
                  className="btn btn-ghost bg-teal-300 btn-md border-1 border-black"
                  onClick={handleDeleteUser}
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Profile details not available.</p>
        )}
      </div>
    </div>
  )
}
