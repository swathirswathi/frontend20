import React, { useState }  from 'react'
import './Home.css'


function Home() {

    const [cars1, setCars1] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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


    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    return (
        <section className="home" id="home">
            <div className="text">
                <h1><span>Looking</span> to <br />rent a car</h1>
                <p>Book your Ride now! <br /> At RoadReadyCars </p>
                <div className="app-stores">
                    <img src="img/ios.png" alt="" />
                    <img src="img/play.png" alt="" />
                </div>
            </div>

            <div className="form-container">
                <form action="">
                    <div className="input-box">
                        <span>Pick-Up Date</span>
                        <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    <div className="input-box">
                        <span>Return Date</span>
                        <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
                    </div>
                    <button onClick={fetchCarsByDate} className='btn btn-primary' type='button'>Search</button>
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
                                        ImageURL: <img src={car.imageURL} alt="car" />
                                        <br />
                                        Specification: {car.specification}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        <p></p>
                    }
                </div>
                </form>
            </div>
        </section>
    )
}




export default Home;