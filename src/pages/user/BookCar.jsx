// In the Booking Page where the user confirms the car and makes payment
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { axiosInstance } from '../../config/axiosInstance';

const API_URL = import.meta.env.VITE_API_URL;

export const BookCar = () => {
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

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

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      if (!bookingDetails) {
        console.error('Booking details are missing');
        return;
      }

      const session = await axiosInstance({
        url: "/payment/makepayment",
        method: "POST",
        data: {
          products: [{ carId: carDetails }],
          bookingDetails,
        },
      });

      const result = await stripe.redirectToCheckout({
        sessionId: session?.data?.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl border-2 border-black p-5 mt-3">
      <h1 className="text-2xl font-bold">{carDetails.name}</h1>
      <img src={carDetails.carpic[0]} alt={carDetails.name} 
      className="w-86 h-52 object-cover" />
      <p>Model: {carDetails.model}</p>
      <p>Seat Capacity: {carDetails.seatcapacity} seats</p>
      <p>Fuel Type: {carDetails.fueltype}</p>
      <p>Transmission: {carDetails.transmissiontype}</p>
      <p>Rent: ₹{carDetails.rentalcharge}</p>
      <button className="btn btn-primary" onClick={makePayment}>Confirm Booking</button>
    </div>
  );
};
