import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './CarDetails.css'

function CarDetails() {
    const { carId } = useParams(); // Get the carId from the URL parameter
    const [carDetails, setCarDetails] = useState(null);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [farePrice, setFarePrice] = useState(0);
   
    const navigate = useNavigate(); 

    useEffect(() => {
        // Function to fetch car details by ID
        const fetchCarDetails = async () => {
            try {
                // Make API call to fetch car details by ID
                console.log('Fetching car details for carId:', carId);
                const response = await fetch(`http://localhost:5260/api/Car/User/Cars/CarDetails/${carId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch car details');
                }
                const data = await response.json();
                console.log('Car details:', data);
                setCarDetails(data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } 
        };

        fetchCarDetails(); // Call the function to fetch car details
    }, [carId]); // Include carId in the dependency array to re-fetch data when it changes
    
    useEffect(() => {
        // Extract pickup and return dates from query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const pickupDateParam = urlParams.get('startDate');
        const returnDateParam = urlParams.get('endDate');

        // Ensure pickup and return dates are not null before setting the state
        if (pickupDateParam && returnDateParam) {
            setPickupDate(pickupDateParam);
            setReturnDate(returnDateParam);
        }
    }, []);
   
    useEffect(() => {
        // Calculate base fare based on pickup and return dates
        if (carDetails && pickupDate && returnDate) {
            const rentalDuration = calculateRentalDuration();
            console.log('Rental duration:', rentalDuration);
            const farePrice = rentalDuration * carDetails.dailyRate;
            console.log('Fare price:', farePrice);
            setFarePrice(farePrice);
        }
    }, [carDetails, pickupDate, returnDate]);

    const calculateRentalDuration = () => {
        const pickupDateObj = new Date(pickupDate);
        const returnDateObj = new Date(returnDate);
        const rentalDuration = (returnDateObj - pickupDateObj) / (1000 * 60 * 60 * 24); 
        return rentalDuration;
    };


    const handleBookNow = () => {
        const queryParams = new URLSearchParams({
            startDate: pickupDate,
            endDate: returnDate,
            farePrice: farePrice,
            carId: carId
          });
      
        // Navigate to the reservation page
        navigate(`/reservation?${queryParams.toString()}`);
    };

    return (
        <div className="car-details-container">
            <div className="car-details-main">
                {carDetails ? (
                    <div>
                        <br />
                        <br />
                        <br />  
                        <div className="box" id="image-detail">
                                <h2>{carDetails.make} {carDetails.model}</h2>
                                <div className="box-img" id="image">
                                    <img src={carDetails.imageURL} alt="car" />
                                </div>
                                <div className='container-car'>
                                    <h4>Car Details</h4>
                                    <p>Model:&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{carDetails.model}</p>
                                    <p>Make:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         {carDetails.make} </p>
                                    <p>Daily Rate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#8377;{carDetails.dailyRate}</p>
                                    <p>Year: &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {carDetails.year}</p>
                                    <p>Specification:&nbsp; {carDetails.specification}</p>
                                </div>  
                            </div>  
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="car-fare-details">
                        <br />
                        <br />
                        <br />
                        <div className='container-cars'>
                        <h4>Fare Details</h4>
                        
                        <p className="para">Base Fare:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8377;{farePrice}</p>
                        <p className="para">DoorStep Delivery and Pickup:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8377;500</p>
                        <p className="para">Insurance & GST:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Included</p>
                        <p className="para">Refundable Security Deposit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8377;1000</p>
                        <p className="para">___________________________________</p>
                        <p className="para1">Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8377;{farePrice + 1000 + 500}</p>
                        <button className="btn" onClick={handleBookNow}>Book Now</button>
                </div>
            </div>
        </div>
    );
}

export default CarDetails;
