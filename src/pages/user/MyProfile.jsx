import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const MyProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = {
    profile_route: '/user/profile',
    delete_route: '/user/deleteuser'
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const allCookies = Cookies.get(); // Get all cookies for debugging
    console.log('All Cookies:', allCookies); // Log all cookies
    const token = Cookies.get('token');
    console.log('Fetched Token:', token);
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: user.profile_route,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("Fetched User Data:", response.data.userData);
        setUserProfile(response.data.userData);
      } catch (error) {
        setError("Failed to load profile");
        toast.error("Failed to load profile");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [user.profile_route]);

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm('Do you want to delete profile?');
    if (!confirmDelete) return;
    try {
      const token = Cookies.get('token');
      const response = await axiosInstance({
        method: 'DELETE',
        url: `${user.delete_route}/${userProfile._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Successfully deleted profile.");
        navigate('/');
      } else {
        throw new Error('Failed to delete profile');
      }
    } catch (error) {
      toast.error("Error deleting profile");
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="hero bg-base-500 min-h-screen md:p-6">
      <div className="card bg-teal-400 shadow-2xl mx-auto flex flex-col p-6 md:w-full sm:w-96">
        <h2 className='text-2xl font-bold font-serif ml-4'>My Profile</h2>
        <div className="flex w-full flex-col">
          <div className="divider divider-error -mt-1"></div>
        </div>
        {userProfile ? (
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center md:w-1/2 mb-4">
              <div className="avatar flex sm:justify-center items-center mb-4">
                <div className="w-24 rounded-xl">
                  <figure>
                    <img src={userProfile.userpic} alt="User Profile" className="w-52 h-52 object-fill rounded-md" />
                  </figure>
                </div>
              </div>
              <div className="mb-2">
                <h3>License Front Picture:</h3>
                <figure>
                  <img src={userProfile.lcfrontpic} alt="License Front" className="w-52 h-52 object-fill rounded-md" />
                </figure>
              </div>
              <div className="mb-2">
                <h3>License Back Picture:</h3>
                <figure>
                  <img src={userProfile.lcbackpic} alt="License Back" className="w-52 h-52 object-fill rounded-md" />
                </figure>
              </div>
            </div>
            <div className="flex flex-col md:w-1/2 md:mt-0 -ml-32 p-5">
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">Name:
                  <input
                    type="text"
                    name="name"
                    className="grow"
                    placeholder={userProfile.name}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">Email:
                  <input
                    type="email"
                    name="email"
                    className="grow"
                    placeholder={userProfile.email}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">Mobile:
                  <input
                    type="text"
                    name="phone"
                    className="grow"
                    placeholder={userProfile.phone}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2 w-full">DOB:
                  <input
                    type="text"
                    name="dob"
                    className="grow"
                    placeholder={userProfile.dob}
                  />
                </label>
              </div>
              <div className='flex gap-2'>
                <button className="btn btn-ghost btn-md bg-teal-300 border-1 border-black">Update Profile</button>
                <button className="btn btn-ghost bg-teal-300 btn-md border-1 border-black" onClick={handleDeleteUser}>Delete Profile</button>
              </div>
            </div>
          </div>
        ) : (
          <p> Profile details not available.</p>
        )}
      </div>
    </div>
  );
};
