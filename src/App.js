// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Components/Home/Home'
// import Ride from './Components/Ride/Ride';
// import CarServices from './Components/CarServices/CarServices';
// import AboutUs from './Components/AboutUs/AboutUs';
// import Review from './Components/Review/Review';
// import ErrorPage from './Components/ErrorPage/ErrorPage'
// import Menu from './Components/Menu/Menu';
// import RegisterUser from './Components/RegisterUser/RegisterUser';
// import RegisterAdmin from './Components/RegisterAdmin/RegisterAdmin';
// import './App.css';
// import Login from './Components/Login/Login';
// import Footer from './Components/Footer/Footer';
// import Reservation from './Components/Reservation/Reservation';


// function App() {
//   return (
//     //<RegisterUser/>
//     //<RegisterAdmin/>
//     //<Login/>
//     //<Ride/>
//     //<Review/>
//     //<AboutUs/>
//     //<Footer/>
//     // <CarServices/>
//     // <Reservation/>

//     // <BrowserRouter>
//     // <Header/>
//     // <Routes>
//     //    <Route path="/" element={<Home/>}/>
//     //    <Route path="/Ride" element={<Ride/>}/>
//     //    <Route path="/CarServices" element={<CarServices/>}/>
//     //    <Route path="/AboutUs" element={<AboutUs/>}/>
//     //    <Route path="/Review" element={<Review/>}/>
//     //    <Route path='*' element={<ErrorPage/>}/>
//     // </Routes>
//     // </BrowserRouter>


//   );
// }

// export default App;


// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Ride from './Components/Ride/Ride';
import CarServices from './Components/CarServices/CarServices';
import AboutUs from './Components/AboutUs/AboutUs';
import Review from './Components/Review/Review';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Menu from './Components/Menu/Menu';
import RegisterUser from './Components/RegisterUser/RegisterUser'
import RegisterAdmin from './Components/RegisterAdmin/RegisterAdmin'
import Login from './Components/Login/Login';
import SearchResult from './Components/SearchResult/SearchResult';
import CarDetails from './Components/CarDetails/CarDetails';
import Reservation from './Components/Reservation/Reservation';
import Payment from './Components/Payment/Payment';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Menu />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ride" element={<Ride />} />
          <Route path="/services" element={<CarServices />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/reviews" element={<Review />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/registeruser' element={<RegisterUser />} />
          <Route path='/registeradmin' element={<RegisterAdmin />} />
          <Route path='/login' element={<Login />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/car-details/:carId" element={<CarDetails/>} />
          <Route element={<PrivateRoute/>}>
          <Route path="/reservation" element={<Reservation/>} />
          </Route>
          <Route path="/payment" element={<Payment/>}/>
        </Routes>
      </div>
    </Router>


  );
}

export default App;