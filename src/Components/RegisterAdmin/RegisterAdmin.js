import { useState } from "react";
import './RegisterAdmin.css';


function RegisterAdmin(){
    var [firstName,setFirstName]=useState("");
    var [lastName,setLastName]=useState("");
    var [email,setEmail]=useState("");
    var [phoneNumber,setPhoneNumber]=useState("");
    var [username,setUsername]=useState("");
    var [password,setPassword]=useState("");
    var [role,setRole]=useState("admin");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    var admin={};

    var register=()=>{
        admin.firstName=firstName;
        admin.lastName=lastName;
        admin.email=email;
        admin.phoneNumber=phoneNumber;
        admin.username=username;
        admin.password=password;
        admin.role=role;

        console.log(admin);

        var requestOptions = {
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify(admin)
        }
        console.log(requestOptions);
        fetch("http://localhost:5260/Register_Admin",requestOptions)
        .then(res=>{if (res.ok) {
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
                          <option value="admin">admin</option>
                      </select>
                  </div>
                  <button onClick={register} className="btn btn-primary" type="button">Register</button>
              </form>
              {/* <div class="links">
              <a href="signin.html">Already have an account?Log in</a>
              </div> */}
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
          </div> 
      </div>
    );
}


export default RegisterAdmin;