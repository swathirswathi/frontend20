import React from 'react'
import { useState,useEffect } from "react";
import './Payment.css';
import { useNavigate,useLocation } from 'react-router-dom';

function Payment (){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    //const reservationId = searchParams.get('reservationId') || '';
    const carId = searchParams.get('carId') || '';
    const paymentAmount = searchParams.get('totalPrice') || '';

    var [paymentMethod,setPaymentMethod]=useState("");
    //var [paymentAmount,setPaymentAmount]=useState("");
    var [paymentStatus,setPaymentStatus]=useState("");
    var [transactionId,setTransactionId]=useState("");
    var [transactionDate,setTransactionDate]=useState("");
    var [reservationId,setReservationId]=useState("");
    var [userId,setUserId]=useState("");
    //var [carId,setCarId]=useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();
    
    function generateTransactionId() {
        const randomId = Math.floor(10000000 + Math.random() * 90000000); // Generate a random 8-digit number
        return randomId.toString(); // Convert to string
    }

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Add leading zero for months/days < 10
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        
        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        // Set transactionDate to today's date when the component mounts
        setTransactionDate(getTodayDate());
        setTransactionId(generateTransactionId());
    }, []);

    var payment = {};

    var register = () => {
        const newTransactionId = generateTransactionId();
        
        // Update transactionId state
        console.log("New Transaction ID:", newTransactionId);
        setTransactionId(newTransactionId);

        payment.paymentMethod = paymentMethod;
        payment.paymentAmount = paymentAmount;
        payment.paymentStatus = paymentStatus;
        payment.transactionId = newTransactionId;
        payment.transactionDate = transactionDate;
        payment.reservationId = reservationId;
        payment.userId =userId;
        payment.carId = carId;
        console.log(payment);

        var requestOptions = {
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify(payment)
        }
        console.log(requestOptions);
        fetch("http://localhost:5260/api/Payment/user/payment/make",requestOptions)
        .then(res=>{
            if (res.ok) {
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 5000);
          navigate('/');
          } else {
          setShowErrorPopup(true);
          setTimeout(() => setShowErrorPopup(false), 5000);
         }
       return res.json()})
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    };
  return (
    <div className="login-body">
          <div className="alert alert-warning login-box" style={{width: "500px"}}>
          <h1 className="text-center mb-4">Payment</h1>
              <form>
                  <div className="mb-3">
                      <label className="form-label">Payment Method:</label>
                            <select className="form-control" onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="option">---Select a Payment Method---</option>
                                <option value="UPI">UPI</option>
                                <option value="Debit">DebitCard</option>
                                <option value="Credit">CreditCard</option>
                            </select>
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Payment Amount:</label>
                      <input className="form-control" type="text" value={paymentAmount} readOnly/>
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Payment Status:</label>
                      <select className="form-control" onChange={(e) => setPaymentStatus(e.target.value)}>
                                <option value="option">---Select a Payment Status---</option>
                                <option value="Pay">Pay</option>
                                <option value="Cancel">Cancel</option>
                            </select>
                  </div>
                  <div className="mb-3">
                      <label className="form-label">TransactionId:</label>
                      <input className="form-control" type="text" value={transactionId} readOnly />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">TransactionDate:</label>  
                      <input className="form-control" type="date" value={transactionDate}  readOnly/>
                  </div>
                  <div className="mb-3">
                      <label className="form-label">ReservationId:</label>
                      <input className="form-control" type="text" value={reservationId} onChange={(e) => setReservationId(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                      <label className="form-label">CarId:</label>
                      <input className="form-control" type="text" value={carId}  readOnly/>
                  </div>
                  <div className="mb-3">
                      <label className="form-label">UserId:</label>
                      <input className="form-control" type="text" value={userId}  onChange={(e) => setUserId(e.target.value)}/>
                  </div>
                  
                  <button onClick={register} className="btn btn-primary" type="button">Pay</button>
              </form>
               {showSuccessPopup && (
                    <div className="alert alert-success" role="alert">
                        Payment successful!
                    </div>
                )}

                {/* Error Popup */}
                {showErrorPopup && (
                    <div className="alert alert-danger" role="alert">
                        Payment failed. Please try again.
                    </div>
                     )}
          </div> 
      </div>
  )
}

export default Payment;