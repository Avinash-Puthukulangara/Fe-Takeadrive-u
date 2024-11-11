import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // For date formatting
import { useNavigate } from 'react-router-dom';  // Import useNavigate

export const MyBookings = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    
    if (!sessionId) {
      setError("Invalid session. Please try again.");
      setLoading(false);
      return;
    }

    // Fetch payment status and booking details from backend
    axios
      .get(`/user/paymentsuccess?session_id=${sessionId}`)
      .then((response) => {
        setBookingDetails(response.data.bookingDetails);
        setLoading(false);
        // Optionally, navigate to another page after a successful payment
        setTimeout(() => {
          navigate("/user/mybookings");  // Redirect to bookings page after 2 seconds
        }, 2000);  // Set delay in milliseconds (2 seconds)
      })
      .catch((error) => {
        setError('Failed to process payment or fetch booking details.');
        setLoading(false);
      });
  }, [navigate]);  // Add navigate as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-bookings-container">
      <h1>Payment Successful</h1>
      <p>Booking Confirmed!</p>
      <div className="booking-details">
        <p><strong>Car:</strong> {bookingDetails?.carname}</p>
        <p><strong>Pick-up Location:</strong> {bookingDetails?.pickuplocation}</p>
        <p><strong>Drop-off Location:</strong> {bookingDetails?.dropofflocation}</p>
        <p><strong>Rental Charge:</strong> ₹{bookingDetails?.rentalcharge}</p>
        <p><strong>Start Date:</strong> {dayjs(bookingDetails?.startdate).format('DD-MM-YYYY HH:mm')}</p>
        <p><strong>End Date:</strong> {dayjs(bookingDetails?.enddate).format('DD-MM-YYYY HH:mm')}</p>
      </div>
    </div>
  );
};
