import { useEffect, useState } from 'react';
import './CarServices.css';

function CarServices() {

    var [cars, setCars] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": 0,
        "availability": false,
        "dailyRate": 0,
        "imageURL": <img src='/images/car2.jpg' alt='car' />,
        "specification": "0"
    }])

    var [cars2, setCars2] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": 0,
        "availability": false,
        "dailyRate": 0,
        "imageURL": <img src='/images/car1.jpg' alt='car' />,
        "specification": "0"
    }])

    const [carById, setCarById] = useState(null);
    const [carIdInput, setCarIdInput] = useState("");

    const [carById1, setCarById1] = useState(null);
    const [carIdInput1, setCarIdInput1] = useState("");

    const [cars1, setCars1] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(()=>{
         fetch("http://localhost:5260/api/Car/admin/cars/GetCarsList")
        .then(res => res.json()) //converting to json//success
        .then(res => {
            setCars(res);
        },[])
        .catch(err => console.log(err));//error
    })

    var fetchClick = () => fetch("http://localhost:5260/api/Car/admin/cars/GetCarsList")
        .then(res => res.json()) //converting to json//success
        .then(res => {
            setCars(res);
        })
        .catch(err => console.log(err));//error

    var fetchClick2 = () => fetch("http://localhost:5260/api/Car/admin/Cars/Availability")
        .then(res => res.json()) //converting to json//success
        .then(res => {
            setCars2(res);
        })
        .catch(err => console.log(err));//error

    var fetchCarById = () => {
        const id = carIdInput.trim(); // Trim any whitespace from the input
        if (id) {
            fetch(`http://localhost:5260/api/Car/User/Cars/${id}`)
                .then(res => res.json())
                .then(car => {
                    setCarById(car);
                })
                .catch(err => console.error(err));
        } else {
            console.error("Please enter a valid car ID");
        }
    };

    var fetchCarById1 = () => {
        const id = carIdInput1.trim(); // Trim any whitespace from the input
        if (id) {
            fetch(`http://localhost:5260/api/Car/admin/user/cars/${id}/availability`)
                .then(res => res.json())
                .then(car => {
                    setCarById1(car);
                })
                .catch(err => console.error(err));
        } else {
            console.error("Please enter a valid car ID");
        }
    };

    const fetchCarsByDate = () => {
        if (!startDate || !endDate) {
            console.error('Please enter both start date and end date.');
            return;
        }

        fetch(`http://localhost:5260/api/Car/user/cars/available/Dates?startDate=${startDate}&endDate=${endDate}`)
            .then(res => res.json())
            .then(data => {
                setCars1(data);
            })
            .catch(err => console.error('Error fetching cars:', err));
    };



    const handleInputChange = (e) => {
        setCarIdInput(e.target.value);
    };

    const handleInputChange1 = (e) => {
        setCarIdInput1(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div>
            <div>
                <h1 className='carTitle'> Cars of the day</h1>
                {/* <button onClick={fetchClick} className='btn btn-primary'>GetCars</button> */}
                <div class="heading">
                        <span>Best Services</span>
                        <h1>Explore Out Top Deals <br /> From Top Rated Dealers</h1>
                </div>
                <section class="services" id="services">
                    <div class="services-container">
                        {cars.map((car) =>
                            <div key={car.carId}>
                                {/* <section class="services" id="services"> */}
                                {/* <div class="services-container"> */}
                                <div class="box">
                                    <div class="box-img">
                                        <img src={car.imageURL} alt="car" />
                                    </div>
                                    <p>{car.year}</p>
                                    <h3>{car.make} {car.model}</h3>
                                    <h2>{car.dailyRate}<span>/DailyRate</span></h2>
                                    <a href="#" class="btn">Rent Now</a>
                                </div>
                            </div>
                            )}
                    </div>
                </section>
                

                {/* <h2>CarId:{car.carId} </h2>
                        <br />
                        Make:{car.make}
                        <br />
                        Model:{car.model}
                        <br />
                        Year:{car.year}
                        <br />
                        Availability:{car.availability ? "Available" : "Not Available"}
                        <br />
                        DailyRate:{car.dailyRate}
                        <br />
                        ImageURL: <img src={car.imageURL} alt="car" />
                        <br />
                        Specification:{car.specification}
                        <br />
                        DiscountId:{car.discountId} */}



                       
            </div>
{/* 
            <div>
                <button onClick={fetchClick2} className='btn btn-primary'>GetAllAvailableCars</button>
                {cars2.map((car) =>
                    <div key={car.carId}>
                        <h2>CarId:{car.carId} </h2>
                        <br />
                        Make:{car.make}
                        <br />
                        Model:{car.model}
                        <br />
                        Year:{car.year}
                        <br />
                        Availability:{car.availability ? "Available" : "Not Available"}
                        <br />
                        DailyRate:{car.dailyRate}
                        <br />
                        ImageURL:<img src={car.imageURL} alt="car" />
                        <br />
                        Specification:{car.specification}
                        <br />
                        DiscountId:{car.discountId}
                    </div>
                )}
            </div>

            <div>
                <h1 className='carTitle'>Car by ID</h1>
                <input type="text" value={carIdInput} onChange={handleInputChange} placeholder="Enter Car ID" />
                <button onClick={fetchCarById} className='btn btn-primary'>Get Car by ID</button>
                {carById &&
                    <div key={carById.carId}>
                        <h2>carId: {carById.carId}</h2>
                        <br />
                        Make: {carById.make}
                        <br />
                        Model: {carById.model}
                        <br />
                        Year: {carById.year}
                        <br />
                        Availability: {carById.availability ? "Available" : "Not Available"}
                        <br />
                        DailyRate: {carById.dailyRate}
                        <br />
                        ImageURL: <img src={carById.imageURL} alt="car" />
                        <br />
                        Specification: {carById.specification}
                    </div>
                }
            </div>

            <div>
                <h1 className='reservationTitle'>Find Available Cars</h1>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
                </div>
                <button onClick={fetchCarsByDate} className='btn btn-primary'>Search</button>
                <div>
                    {cars1.length > 0 ?
                        <div>
                            <h2>Available Cars:</h2>
                            <ul>
                                {cars1.map((car, index) => (
                                    <li key={index}>
                                        <h2>carId: {car.carId}</h2>
                                        <br />
                                        Make: {car.make}
                                        <br />
                                        Model: {car.model}
                                        <br />
                                        Year: {car.year}
                                        <br />
                                        Availability: {car.availability ? "Available" : "Not Available"}
                                        <br />
                                        DailyRate: {car.dailyRate}
                                        <br />
                                        ImageURL: {car.imageURL}
                                        <br />
                                        Specification: {car.specification}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        <p>No cars available for the selected dates.</p>
                    }
                </div>
            </div>

            <div>
                <h1 className='carTitle'>Car Avalilability by ID</h1>
                <input type="text" value={carIdInput1} onChange={handleInputChange1} placeholder="Enter Car ID" />
                <button onClick={fetchCarById1} className='btn btn-primary'>Get CarAvailability by ID</button>
                {carById1 &&
                    <div key={carById1.carId}>
                        <h2>carId: {carById1.carId}</h2>
                        <br />
                        Availability: {carById1.availability ? "Available" : "Not Available"}
                    </div>
                }
            </div> */}

        </div>
    )

}

export default CarServices;