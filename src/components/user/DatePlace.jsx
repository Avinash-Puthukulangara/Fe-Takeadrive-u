import React, { useContext, useState } from 'react'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { SearchContext } from './SearchContext';


export const DatePlace = ({  }) => {

  const {setCars, setShowSearch} = useContext(SearchContext);

  const [selectedCity, setSelectedOption] = useState('Select City');
  const [selectedPickup, setSelectedPickup] = useState('Select Pickup');
  const [selectedDropoff, setSelectedDropoff] = useState('Select Dropoff');
  const [isLoading, setIsLoading] = useState(false);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const currentDate = dayjs();


  const cityOptions = {
    SelectCity: ['Select Pickup','Select Dropoff'],
    Trivandrum: ['Home Delivery','Kazhakootam', 'Technopark', 'Pettah'],
    Kollam: ['Home Delivery','Chinnakkada', 'Kollam Beach', 'Kadappakada'],
    Calicut: ['Home Delivery','Mavoor Road', 'West Hill', 'Thondayad'],
  };
  
  const handleCity = (city) => {
    setSelectedOption(city);
    setSelectedPickup('Select Pickup Location');
    setSelectedDropoff('Select Dropoff Location');
  };

  const handlePickup = (location) => {
    setSelectedPickup(location);
  };

  const handleDropoff = (location) => {
    setSelectedDropoff(location);
  };

  const user = {
    dateplace_route: '/car/availablecars'
  }

  const validateDates = () => {
    if (pickupDate && pickupDate.isBefore(currentDate, 'minute')) {
      toast.error("Pickup date and time cannot be in the past!");
      return false;
    }

    if (pickupDate && pickupDate.isSame(currentDate, 'day') && pickupDate.isBefore(currentDate.add(2, 'hour'))) {
      toast.error("You can only book a car 2 hours ahead of the current time!");
      return false;
    }

    if (dropoffDate && dropoffDate.isBefore(pickupDate, 'minute')) {
      toast.error("Dropoff date must be after the pickup date!");
      return false;
    }

    return true;  
  };

  const onSubmit = async (data) => {
    if (!validateDates()) return;
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 900))

      const response = await axiosInstance({
        method: 'POST',
        url: '/car/availablecars', 
        data: {
          startdate: pickupDate ? pickupDate.toISOString() : null,
          enddate: dropoffDate ? dropoffDate.toISOString() : null,
          pickuplocation: selectedPickup,
          dropofflocation: selectedDropoff,
        },
      });
      const carsData = response.data.allCarsdata;
      console.log('Received car data:',carsData);
      setCars(carsData)
      localStorage.setItem('cars', JSON.stringify(carsData));
      setShowSearch(false);
      navigate("/user/carlist");

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="hero bg-slate-400 min-h-screen">
      <div className="card bg-red-400 md:w-96 sm:w-auto shadow-2xl mx-auto">

          <div className="form-control items-center mt-3">
            <h1 className='text-md font-serif font-semibold'>Select Place & Date</h1>
          </div>
           
       <form className="card-body items-center -mt-4" onSubmit={handleSubmit(onSubmit)} >

        <div>
          <h3 className='text-sm font-semibold'>City</h3>
          <details className="dropdown">
           <summary className="btn m-1 w-64" >{selectedCity}</summary>
           <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a onClick={() => handleCity('Trivandrum')}>Trivandrum</a></li>
            <li><a onClick={() => handleCity('Kollam')}>Kollam</a></li>
            <li><a onClick={() => handleCity('Calicut')}>Calicut</a></li>
           </ul>
          </details>
        </div>

        <div>
        <h3 className='text-sm font-semibold'>Pickup Location</h3>
            <details className="dropdown">
              <summary className="btn m-1 w-64" >{selectedPickup}</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {selectedCity !== 'Select City' && cityOptions[selectedCity]?.map((location) => (
                  <li key={location}>
                    <a onClick={() => handlePickup(location)}>{location}</a>
                  </li>
                ))}
              </ul>
            </details>
        </div>

        <div>
          <h3 className='text-sm font-semibold'>Dropoff Location</h3>
            <details className="dropdown" >
              <summary className="btn m-1 w-64" >{selectedDropoff}</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {selectedCity !== 'Select City' && cityOptions[selectedCity]?.map((location) => (
                  <li key={location}>
                    <a onClick={() => handleDropoff(location)}>{location}</a>
                  </li>
                ))}
              </ul>
            </details>
        </div>

        <div>
          <h3 className='text-sm font-semibold'>Pickup Date</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div >
             <DemoContainer components={['DateTimePicker']} className="w-full">
               <DemoItem>
                 <DateTimePicker value={pickupDate} onChange={(newValue)=> setPickupDate(newValue)}
                 views={['year', 'month', 'day', 'hours', 'minutes']}
                 disablePast minDate={currentDate} minTime={pickupDate?.isSame(currentDate, 'day') ? currentDate.add(2, 'hour') : null}/>
               </DemoItem>
            </DemoContainer>
           </div>
          </LocalizationProvider>
        </div>

        <div>
          <h3 className='text-sm font-semibold'>Dropoff Date</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div >
             <DemoContainer components={['DateTimePicker']} className="w-full">
               <DemoItem>
                 <DateTimePicker value={dropoffDate} onChange={(newValue)=> setDropoffDate(newValue)}
                 views={['year', 'month', 'day', 'hours', 'minutes']} 
                 disablePast minTime={pickupDate ? pickupDate.add(1, 'hour') : null}/>
               </DemoItem>
            </DemoContainer>
           </div>
          </LocalizationProvider>
        </div>

        <button className="btn btn-wide bg-slate-600 bg-opacity-50" disabled={isLoading}>
            {isLoading ? (<span className="loading loading-dots loading-md"></span>) : ("Search Car")}
          </button>

       </form>

      </div>
    </div>
  )
}
