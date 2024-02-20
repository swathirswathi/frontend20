import React from 'react';
import './Ride.css';

const Ride = () => {
  return (
    <section className="ride" id="ride">
      <div className="heading">
        <span>How it Works</span>
        <h1>Rent With 3 Easy Steps</h1>
      </div>
      <div className="ride-container">
        <div className="box">
          <i className='bx bx-map'></i>
          <h2>Choose A Location</h2>
          <p>Choose the location where you want to rent a car. We offer rental options in various cities and neighborhoods. Select the most convenient location for you and get ready for your adventure!</p>
        </div>

        <div className="box">
          <i className='bx bxs-calendar-check'></i>
          <h2>Pick-Up Date</h2>
          <p>Choose the date when you want to pick up your rental car. Our flexible booking system allows you to select the most convenient date for your trip. Book your car now and start planning your journey!</p>
        </div>

        <div className="box">
          <i className='bx bxs-calendar-star'></i>
          <h2>Book A Car</h2>
          <p>Ready to book your car? Our easy-to-use booking platform allows you to browse through a wide selection of vehicles and choose the one that best suits your needs. Start your journey today!</p>
        </div>
      </div>
    </section>
  );
};

export default Ride;
