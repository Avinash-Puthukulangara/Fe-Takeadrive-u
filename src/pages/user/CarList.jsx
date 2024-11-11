import React, { useState, useEffect, useContext } from 'react';
import { DatePlace } from '../../components/user/DatePlace';
import { SearchContext } from '../../components/user/SearchContext';
import { useNavigate } from 'react-router-dom';

export const CarList = () => {
  const { cars, setCars, showSearch, setShowSearch } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [seatCapacity, setSeatCapacity] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [range, setRange] = useState([0, 5000]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    if (savedCars.length > 0) {
      setCars(savedCars);
      setFilteredCars(savedCars);
      setShowSearch(false);
    }
  }, [setCars, setShowSearch]);
  
  // const handleRetry = () => {
  //   setShowSearch(true);
  //   setCars([]);
  //   setFilteredCars([]);
  // };


  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filtered = cars.filter((car) => {
      return (
        (!name || car.name.toLowerCase().includes(name.toLowerCase())) &&
        (!model || car.model.toLowerCase() === model.toLowerCase()) &&
        (!seatCapacity || car.seatcapacity.toString() === seatCapacity) &&
        (!transmissionType || car.transmissiontype.toLowerCase() === transmissionType.toLowerCase()) &&
        (!fuelType || car.fueltype.toLowerCase() === fuelType.toLowerCase())
      );
    });
    setFilteredCars(filtered);
    setIsMenuOpen(false);
  };

  const clearFilters = () => {
    setName('');
    setModel('');
    setSeatCapacity('');
    setTransmissionType('');
    setFuelType('');
    setFilteredCars(cars);
    setIsMenuOpen(false);
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 max-w-screen-2xl sticky top-0">
      <div className="flex justify-between items-center mb-4 mt-4">
        <button className="btn btn-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? 'Hide Filter' : 'Show Filter'}
        </button>
        <h1 className="text-2xl font-bold">Available Cars</h1>
      </div>

      {isMenuOpen && (
        <div  className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg p-4 mt-2">
          <h2 className="text-xl font-semibold mb-4">Filter Cars</h2>
          <form onSubmit={handleFilterSubmit}>
            <input
              className="input input-bordered mb-3 w-full"
              placeholder="Search Car by Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="input input-bordered mb-3 w-full"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="">Select Model</option>
              <option value="suv">SUV</option>
              <option value="mpv">MPV</option>
              <option value="hatchback">Hatchback</option>
              <option value="sedan">Sedan</option>
            </select>

            <select
              className="input input-bordered mb-3 w-full"
              value={seatCapacity}
              onChange={(e) => setSeatCapacity(e.target.value)}
            >
              <option value="">Seat Capacity</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>

            <select
              className="input input-bordered mb-3 w-full"
              value={transmissionType}
              onChange={(e) => setTransmissionType(e.target.value)}
            >
              <option value="">Transmission Type</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>

            <select
              className="input input-bordered mb-3 w-full"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Fuel Type</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
            </select>

            <button type="submit" className="btn btn-primary w-full mb-2">
              Apply Filter
            </button>
            <button type="button" className="btn btn-secondary w-full" onClick={clearFilters}>
              Clear Filters
            </button>
          </form>
        </div>
      )}

      {showSearch ? (
        <DatePlace />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-1">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : filteredCars.length > 0 ? (
            filteredCars.map((car) => (
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
                  <p>Rent: ₹{car.rentalcharge ?? 'Not available'}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate(`/user/bookcar/${car._id}`)}>
                      Book Car
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p>No cars available. Please try different filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
