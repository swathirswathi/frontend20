
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import './Menu.css'; // Import your CSS file

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
      const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true,
      });
  
      sr.reveal('.text', { delay: 200, origin: 'top' });
      sr.reveal('.form-container form', { delay: 600, origin: 'left' });
      sr.reveal('.heading', { delay: 600, origin: 'top' });
      sr.reveal('.ride-container .box', { delay: 400, origin: 'top' });
      sr.reveal('.services-container .box', { delay: 400, origin: 'top' });
      sr.reveal('.about-container .box', { delay: 400, origin: 'top' });
      sr.reveal('.reviews-container', { delay: 400, origin: 'top' });
      sr.reveal('.newsletter .box', { delay: 200, origin: 'bottom' });
  
      // Clean up the ScrollReveal instance
      return () => {
        sr.destroy();
      };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render
  
    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    // Close menu on window scroll
    useEffect(() => {
      const handleScroll = () => {
        setIsMenuOpen(false);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  
  return (
    <header className="header">
      <Link to="/" className="logo"><img src="/images/jeep.png" alt="logo" /></Link>
      <div className={`bx bx-menu ${isMenuOpen ? 'bx-x' : ''}`} id="menu-icon" onClick={handleMenuToggle}></div>
      <ul className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ride">Ride</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>
      <div className="header-btn">
        <Link to="/registeruser" className="sign-up">RegisterUser</Link>
        <Link to="/registeradmin" className="sign-up">RegisterAdmin</Link>
        <Link to="/login" className="sign-in">Login</Link>
      </div>
    </header>
  );
}

export default Menu;
