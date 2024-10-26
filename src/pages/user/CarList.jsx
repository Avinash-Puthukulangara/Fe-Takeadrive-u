import React, { useState, useEffect, useContext } from 'react';
import { DatePlace } from '../../components/user/DatePlace';
import { SearchContext } from '../../components/user/SearchContext';

export const CarList = () => {
  const { cars, setCars, showSearch, setShowSearch } = useContext(SearchContext)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    if (savedCars.length > 0) {
      setCars(savedCars);
      setShowSearch(false);
    }
  }, [setCars, setShowSearch]);

  const handleRetry = () => {
    setShowSearch(true);
    setCars([]);
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
      {showSearch ? (
        <DatePlace />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img src={car.carpic[0]} alt={car.name} className="w-full h-52 object-cover" />
                </figure>
                <div className="card-body border-2 border-gray-400 h-72 rounded-b-2xl">
                  <h2 className="card-title">{car.name}</h2>
                  <p>Model: {car.model}</p>
                  <p>Seat Capacity: {car.seatcapacity} seats</p>
                  <p>Fuel Type: {car.fueltype}</p>
                  <p>Transmission: {car.transmissiontype}</p>
                  <p>Rent: ₹{car.rentalcharge ?? "Not available"}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Book Car</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p>No cars available. Please try different dates or locations.</p>
              <button className="btn btn-secondary" onClick={handleRetry}>Search Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
