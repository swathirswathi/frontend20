
import { useState } from "react";
import './RegisterUser.css';

function RegisterUser(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
  
    var user={};

    var register=()=>{
        user.firstName=firstName;
        user.lastName=lastName;
        user.email=email;
        user.phoneNumber=phoneNumber;
        user.username=username;
        user.password=password;
        user.role=role;

        console.log(user);

        var requestOptions = {
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify(user)
        }
        console.log(requestOptions);
        fetch("http://localhost:5260/Register_User",requestOptions)
        .then(res=>{
            if (res.ok) {
                setShowSuccessPopup(true);
                setTimeout(() => setShowSuccessPopup(false), 5000);
            } else {
                setShowErrorPopup(true);
                setTimeout(() => setShowErrorPopup(false), 5000);
            }
           return res.json()})
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    };

    return(
      <div className="login-body">
            <div className="alert alert-warning login-box" style={{width: "500px"}}>
            <h1 className="text-center mb-4">Register</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">First Name:</label>
                        <input className="form-control" type="text" value={firstName} placeholder='Please Enter FirstName' onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name:</label>
                        <input className="form-control" type="text" value={lastName} placeholder='Please Enter LastName' onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input className="form-control" type="email" value={email} placeholder='Please Enter Email' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number:</label>
                        <input className="form-control" type="tel" value={phoneNumber} placeholder='Please Enter PhoneNumber' onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>  
                        <input className="form-control" type="text" value={username} placeholder='Please Enter Username' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" value={password} placeholder='Please Enter Password' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className="form-control" onChange={(e) => setRole(e.target.value)}>
                            <option value="user">user</option>
                        </select>
                    </div>
                    <button onClick={register} className="btn btn-primary" type="button">Register</button>
                </form>
                 {/* Success Popup */}
                 {showSuccessPopup && (
                    <div className="alert alert-success" role="alert">
                        Registration successful!
                    </div>
                )}

                {/* Error Popup */}
                {showErrorPopup && (
                    <div className="alert alert-danger" role="alert">
                        Registration failed. Please try again.
                    </div>
                     )}
                {/* <div class="links">
                <a href="signin.html">Already have an account?Log in</a>
                </div> */}
            </div> 
        </div>
    );
}

export default RegisterUser;
