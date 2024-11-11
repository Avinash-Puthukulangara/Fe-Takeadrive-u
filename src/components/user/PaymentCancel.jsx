import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/user/carlist");
    }, 5000); 
  }, [navigate]);

  return (
    <div className="payment-canceled-page">
      <div className="canceled-container">
        <div className="cross-animation">
          <svg
            className="crossmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            width="52"
            height="52"
          >
            <path
              className="cross-line"
              fill="none"
              d="M14 14l24 24M14 38L38 14"
            />
          </svg>
        </div>
        <h1 className="canceled-message">Payment Canceled</h1>
        <p>Your payment has been canceled. Please try again later.</p>
        <p className="redirect-message">Redirecting to carspage...</p>
      </div>
    </div>
  );
};

export default PaymentCanceled;
