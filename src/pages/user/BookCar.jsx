import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const BookCar = () => {
  const { carId } = useParams(); 
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`car/cardetails/${carId}`, {
          withCredentials: true,
        });
        setCarDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!carDetails) {
    return <p>Car details not found.</p>;
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl border-2 border-black p-5">
      <h1 className="text-2xl font-bold">{carDetails.name}</h1>
      <img src={carDetails.carpic[0]} alt={carDetails.name} 
      className="w-86 h-52 object-cover" />
      <p>Model: {carDetails.model}</p>
      <p>Seat Capacity: {carDetails.seatcapacity} seats</p>
      <p>Fuel Type: {carDetails.fueltype}</p>
      <p>Transmission: {carDetails.transmissiontype}</p>
      <p>Rent: ₹{carDetails.rentalcharge}</p>
      <button className="btn btn-primary">Confirm Booking</button>
    </div>
  );
};
