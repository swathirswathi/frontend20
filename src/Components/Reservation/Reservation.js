import React, { useState, useEffect } from 'react';
import './Reservation.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Reservation() {

    // var [reservations, setReservations] = useState([{
    //     "reservationId": 0,
    //     "pickUpDateTime": 0,
    //     "dropOffDateTime": 0,
    //     "status": "0",
    //     "pickUpStoreLocation": "0",
    //     "dropOffStoreLocation": "0",
    //     "totalPrice": 0,
    //     "paymentId": 0,
    //     "userId": 0,
    //     "carId": 0
    // }])
    // var [reservations1, setReservations1] = useState([{
    //     "reservationId": 0,
    //     "pickUpDateTime": 0,
    //     "dropOffDateTime": 0,
    //     "status": "0",
    //     "pickUpStoreLocation": "0",
    //     "dropOffStoreLocation": "0",
    //     "totalPrice": 0,
    //     "paymentId": 0,
    //     "userId": 0,
    //     "carId": 0
    // }])
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    
    const pickUpDateTime = searchParams.get('startDate') || '';
    const dropOffDateTime = searchParams.get('endDate') || '';
    const totalPrice = searchParams.get('farePrice') || '';
    const carId = searchParams.get('carId') || '';
    const [totalPriceWithExtra, setTotalPriceWithExtra] = useState(parseInt(totalPrice) + 1500);


   // var [pickUpDateTime, setPickUpDateTime] = useState("");
    //var [dropOffDateTime, setDropOffDateTime] = useState("");
    var [status, setStatus] = useState("reserved");
    var [pickUpStoreLocation, setPickUpStoreLocation] = useState("");
    var [dropOffStoreLocation, setDropOffStoreLocation] = useState("");
    //var [totalPrice, setTotalPrice] = useState("");
    var [userId, setUserId] = useState("");
   // var [carId, setCarId] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();

    // const [reservationById, setReservationById] = useState(null); // State to store the reservation fetched by ID
    // const [reservationIdInput, setReservationIdInput] = useState(""); // State to store the input for reservation

    // const [reservationStatusById, setReservationStatusById] = useState(null); // State to store the reservation fetched by ID
    // const [reservationStatusIdInput, setReservationStatusIdInput] = useState(""); // State to store the input for reservation

    // const [reservationbyUserId, setReservationbyUserId] = useState([null]); // State to store the reservation fetched by ID
    // const [reservationbyUserIdInput, setReservationbyUserIdInput] = useState(""); // State to store the input for reservation

    var reservation = {};

    var register = () => {
        const totalPriceWithExtra = parseInt(totalPrice) + 1500;

        reservation.pickUpDateTime = pickUpDateTime;
        reservation.dropOffDateTime = dropOffDateTime;
        reservation.status = status;
        reservation.pickUpStoreLocation = pickUpStoreLocation;
        reservation.dropOffStoreLocation = dropOffStoreLocation;
        reservation.totalPrice = totalPriceWithExtra;
        reservation.userId = userId;
        reservation.carId = carId;

     console.log(reservation);

        var requestOptions = {
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify(reservation)
        }
        console.log(requestOptions);
        fetch("http://localhost:5260/api/Reservation/user/MakeReservation",requestOptions)
        .then(res=>{
            if (res.ok) {
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 5000);
          navigate('/payment');
          } else {
          setShowErrorPopup(true);
          setTimeout(() => setShowErrorPopup(false), 5000);
         }
       return res.json()})
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    };

    const handleBookNow = () => {
        const queryParams = new URLSearchParams({
            //reservationId:reservationId,
            carId: carId,
            totalPrice:totalPrice
          });
      
        // Navigate to the reservation page
        navigate(`/payment?${queryParams.toString()}`);
    };

    // var fetchClick = () => fetch("http://localhost:5260/api/Reservation/admin/All")
    //     .then(res => res.json()) //converting to json//success
    //     .then(res => {
    //         setReservations(res);
    //     })
    //     .catch(err => console.log(err));//error

    // var fetch1Click = () => fetch("http://localhost:5260/api/Reservation/admin/pending")
    //     .then(res => res.json()) //converting to json//success
    //     //.then(res=>console.log(res))
    //     .then(res => {
    //         setReservations1(res);
    //     })
    //     .catch(err => console.log(err));//error

    // var fetchReservationById = () => {
    //     const id = reservationIdInput.trim(); // Trim any whitespace from the input
    //     if (id) {
    //         fetch(`http://localhost:5260/api/Reservation/user/${id}`)
    //             .then(res => res.json())
    //             .then(reservation => {
    //                 setReservationById(reservation);
    //             })
    //             .catch(err => console.error(err));
    //     } else {
    //         console.error("Please enter a valid reservation ID");
    //     }
    // };

    // var fetchReservationStatusById = () => {
    //     const id = reservationStatusIdInput.trim(); // Trim any whitespace from the input
    //     if (id) {
    //         fetch(`http://localhost:5260/api/Reservation/user/${id}/status`)
    //             .then(res => res.json())
    //             .then(reservation => {
    //                 setReservationStatusById(reservation);
    //             })
    //             .catch(err => console.error(err));
    //     } else {
    //         console.error("Please enter a valid reservation ID");
    //     }
    // };

    // var fetchReservationbyUserId = () => {
    //     const id = reservationbyUserIdInput.trim(); // Trim any whitespace from the input
    //     if (id) {
    //         fetch(`http://localhost:5260/api/Reservation/user/${id}/status`)
    //             .then(res => res.json())
    //             .then(reservation => {
    //                 setReservationbyUserId(reservation);
    //             })
    //             .catch(err => console.error(err));
    //     } else {
    //         console.error("Please enter a valid reservation ID");
    //     }
    // };

    // const handleInputChange = (e) => {
    //     setReservationIdInput(e.target.value);
    // };

    // const handleInputStatusChange = (e) => {
    //     setReservationStatusIdInput(e.target.value);
    // };

    // const handlebyUserIdChange = (e) => {
    //     setReservationbyUserIdInput(e.target.value);
    // };

    return (
        <div>
            <div className="login-body">
                <div className="alert alert-warning login-box" style={{ width: "500px" }}>
                    <br />
                    <br />
                    <h1 className="text-center mb-4">Reservation</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">PickUp Date:</label>
                            <input className="form-control" type="date" value={pickUpDateTime} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">DropOff Date:</label>
                            <input className="form-control" type="date" value={dropOffDateTime} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                <option value="reserved">reserved</option>
                                <option value="pending">pending</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">PickUp Store Location:</label>
                            <select className="form-control" onChange={(e) => setPickUpStoreLocation(e.target.value)}>
                                <option value="option">---Select a Location---</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Goa">Goa</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                                <option value="Mysore">Mysore</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">DropOff Store Location:</label>
                            <select className="form-control" onChange={(e) => setDropOffStoreLocation(e.target.value)} >
                                <option value="option">---Select a Location---</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Goa">Goa</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                                <option value="Mysore">Mysore</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Total Price:</label>
                            <input className="form-control" type="text" value={totalPriceWithExtra} placeholder='Please Enter TotalPrice' readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">User Id:</label>
                            <input className="form-control" type="number" value={userId} placeholder='Please Enter UserId' onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Car Id:</label>
                            <input className="form-control" type="number" value={carId} placeholder='Please Enter CarId' readOnly />
                        </div>

                        <button onClick={handleBookNow} className="btn btn-primary" type="button">Reserve</button>
                    </form>
                    {showSuccessPopup && (
                    <div className="alert alert-success" role="alert">
                        Reservation successful!
                    </div>
                )}

                {/* Error Popup */}
                {showErrorPopup && (
                    <div className="alert alert-danger" role="alert">
                        Reservation failed. Please try again.
                    </div>
                     )}
                </div>
            </div>
            {/* <div>
                <h1 className='reservationTitle'> Reservations of the day</h1>
                <button onClick={fetchClick} className='btn btn-primary'>GetAllReservations</button>
                {reservations.map((reservation) =>
                    <div key={reservation.reservationId}>
                        <h2>ReservationId:{reservation.reservationId} </h2>
                        <br />
                        PickUpDateTime:{reservation.pickUpDateTime}
                        <br />
                        DropOffDateTime:{reservation.dropOffDateTime}
                        <br />
                        Status:{reservation.status}
                        <br />
                        PickUpStoreLocation:{reservation.pickUpStoreLocation}
                        <br />
                        DropOffStoreLocation:{reservation.dropOffStoreLocation}
                        <br />
                        TotalPrice:{reservation.totalPrice}
                        <br />
                        PaymentId:{reservation.paymentId}
                        <br />
                        UserId:{reservation.userId}
                        <br />
                        carId:{reservation.carId}
                    </div>
                )}
            </div>

            <div>
                <h1 className='reservationTitle'> Reservations of the day</h1>
                <button onClick={fetch1Click} className='btn btn-primary'>GetAllPendingReservations</button>
                {reservations1.map((reservation) =>
                    <div key={reservation.reservationId}>
                        <h2>ReservationId:{reservation.reservationId} </h2>
                        <br />
                        PickUpDateTime:{reservation.pickUpDateTime}
                        <br />
                        DropOffDateTime:{reservation.dropOffDateTime}
                        <br />
                        Status:{reservation.status}
                        <br />
                        PickUpStoreLocation:{reservation.pickUpStoreLocation}
                        <br />
                        DropOffStoreLocation:{reservation.dropOffStoreLocation}
                        <br />
                        TotalPrice:{reservation.totalPrice}
                        <br />
                        PaymentId:{reservation.paymentId}
                        <br />
                        UserId:{reservation.userId}
                        <br />
                        carId:{reservation.carId}
                    </div>
                )}
            </div>

            <div>
                <h1 className='reservationTitle'>Reservation by ID</h1>
                <input type="text" value={reservationIdInput} onChange={handleInputChange} placeholder="Enter Reservation ID" />
                <button onClick={fetchReservationById} className='btn btn-primary'>Get Reservation by ID</button>
                {reservationById &&
                    <div key={reservationById.reservationId}>
                        <h2>ReservationId: {reservationById.reservationId}</h2>
                        <br />
                        PickUpDateTime: {reservationById.pickUpDateTime}
                        <br />
                        DropOffDateTime: {reservationById.dropOffDateTime}
                        <br />
                        Status: {reservationById.status}
                        <br />
                        PickUpStoreLocation: {reservationById.pickUpStoreLocation}
                        <br />
                        DropOffStoreLocation: {reservationById.dropOffStoreLocation}
                        <br />
                        TotalPrice: {reservationById.totalPrice}
                        <br />
                        PaymentId: {reservationById.paymentId}
                        <br />
                        UserId: {reservationById.userId}
                        <br />
                        carId: {reservationById.carId}
                    </div>
                }
            </div>

            <div>
                <h1 className='reservationStatusTitle'>Reservation Status by ID</h1>
                <input type="text" value={reservationStatusIdInput} onChange={handleInputStatusChange} placeholder="Enter Reservation ID" />
                <button onClick={fetchReservationStatusById} className='btn btn-primary'>Get ReservationStatus by ID</button>
                {reservationStatusById &&
                    <div key={reservationStatusById.reservationId}>
                        <h2>ReservationId: {reservationStatusById.reservationId}</h2>
                        <br />
                        Status: {reservationStatusById.status}

                    </div>
                }
            </div>

            <div>
                <h1 className='reservationbyUserIdTitle'>Reservation byUserId</h1>
                <input type="text" value={reservationbyUserIdInput} onChange={handlebyUserIdChange} placeholder="Enter Reservation ID" />
                <button onClick={fetchReservationbyUserId} className='btn btn-primary'>Get Reservation by UserId</button>
                {reservationbyUserId &&
                    <div key={reservationbyUserId.userId}>
                        <h2>ReservationId: {reservationbyUserId.reservationId}</h2>
                        <br />
                        PickUpDateTime: {reservationbyUserId.pickUpDateTime}
                        <br />
                        DropOffDateTime: {reservationbyUserId.dropOffDateTime}
                        <br />
                        Status: {reservationbyUserId.status}
                        <br />
                        PickUpStoreLocation: {reservationbyUserId.pickUpStoreLocation}
                        <br />
                        DropOffStoreLocation: {reservationbyUserId.dropOffStoreLocation}
                        <br />
                        TotalPrice: {reservationbyUserId.totalPrice}
                        <br />
                        PaymentId: {reservationbyUserId.paymentId}
                        <br />
                        UserId: {reservationbyUserId.userId}
                        <br />
                        carId: {reservationbyUserId.carId}
                    </div>
                }
            </div> */}

        </div>
    );
}

export default Reservation;