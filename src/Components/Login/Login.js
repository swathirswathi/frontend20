import { useState } from 'react';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';


function Login(){
    var [username,setUsername]=useState("");
    var [password,setPassword] = useState("");
    var [loggedin,setLoggedin] = useState(false);
    const navigate = useNavigate();


    var user={};
    var login =(e)=>{
        e.preventDefault();
        user.username = username;
        user.password=password;
        user.role = "";
        user.token ="";
        var requestOptions = {
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify(user)
        }
       
        console.log(requestOptions);
        const response= fetch("http://localhost:5260/Login",requestOptions)
    .then(res=>res.json())
        .then(res=>{
            sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("username",res.username);
            if (response.ok) {
                navigate('/');
            } 
           alert("Login success "+res.username);
           
        })
        .catch(err=>{
            console.log(err);
            setLoggedin(false);
        });
    };
    return(
    <div className="login-body">
         {loggedin ? (
                <h2 className='alert alert-success'></h2>
            ) : null}
        
        
          <div className="alert alert-warning login-box" style={{width: "500px"}}>
          <h1 className="text-center mb-4">Login</h1>
        <form>
                <div className="mb-3">
                    <label className="form-label">Username:</label>  
                    <input className="form-control" type="text" value={username} placeholder='Please Enter Username' onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="password" value={password} placeholder='Please Enter Password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
            
                <button onClick={login} className="btn btn-primary" type="button">Login</button>
                <Link className='register_link' to="/registeradmin" >Register Admin</Link>
                <Link className='register_link' to="/registeruser" >Register User</Link>
                {/* <Link to="/registeruser" className="sign-up">RegisterUser</Link>
                <Link to="/registeradmin" className="sign-up">RegisterAdmin</Link> */}
            
        </form>
    </div>

    </div>  
    
    );
}

export default Login;