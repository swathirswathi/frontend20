import React, { useEffect, useState } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';

function SearchResult() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    const [cars, setCars] = useState([]);

    const navigate = useNavigate();
    //const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        if (!startDate || !endDate) return;

        // Fetch available cars based on start and end dates
        fetchAvailableCars(startDate, endDate)
            .then(data => setCars(data))
            .catch(error => console.error('Error fetching available cars:', error));
    }, [startDate, endDate]);

    // Simulated function to fetch available cars from API
    const fetchAvailableCars = async (startDate, endDate) => {
        try {
            // Make API call to fetch available cars using startDate and endDate
            const response = await fetch(`http://localhost:5260/api/Car/user/cars/available/Dates?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    const handleCarDetails = (carId) => {
        //navigate(`/car-details/${carId}`);
        navigate(`/car-details/${carId}?startDate=${startDate}&endDate=${endDate}`);
    };
    return (
        <div className="search-result">
            <br />
            <br />
            <br />
            
            <section class="services" id="services">
            <h1>Available Cars</h1>
                <div class="services-container">
                    {cars.map((car) =>
                        <div key={car.carId}>
                            {/* <section class="services" id="services"> */}
                            {/* <div class="services-container"> */}
                            <div className="box">
                                <div className="box-img">
                                    <img src={car.imageURL} alt="car" />
                                </div>
                                <p>{car.year}</p>
                                <h3>{car.make} {car.model}</h3>
                                <h2>{car.dailyRate}<span>/DailyRate</span></h2>
                                <button onClick={() => handleCarDetails(car.carId)} className="btn">Rent Now</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default SearchResult;
