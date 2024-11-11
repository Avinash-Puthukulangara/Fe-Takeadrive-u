import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      navigate("/user/mybookings");
    }, 4000); 
  }, [navigate]);

  return (
    <div className="payment-success-page">
      <div className="success-container">
        <div className="tick-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            width="54"
            height="54"
          >
            <circle
              className="circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="check"
              fill="none"
              d="M14 26l7 7 15-15"
            />
          </svg>
        </div>
        <h1 className="success-message">Payment Successful</h1>
        <p>Your payment has been successfully processed. You will be redirected shortly.</p>
        <p className="redirect-message">Redirecting to bookingpage...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
