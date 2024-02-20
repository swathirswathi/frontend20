import './AboutUs.css'

function AboutUs(){
 return(
    <section className="about" id="about">
    <div className="heading">
        <span>About Us</span>
        <h1>Best Customer Experience</h1>
    </div>
    <div className="about-container">
        <div className="about-img">
            <img src="/images/about.png" alt="car"/>
        </div>
        <div className="about-text">
            <span>About Us</span>
            <p>Welcome to RoadReady, your ultimate destination for car rentals!</p>
            <p>At RoadReady, we strive to provide our customers with convenient and affordable car rental solutions. Whether you're planning a weekend getaway, a business trip, or a family vacation, we've got you covered.</p>
            <p>Our mission is to make car rental as simple and straightforward as possible. With our easy-to-use booking platform, you can browse through a wide selection of vehicles, choose the one that best suits your needs, and book it in just a few clicks.</p>
            <p>With competitive prices, transparent rental terms, and exceptional customer service, RoadReady is your trusted partner for all your car rental needs. Experience the freedom of the open road and start your journey with us today!</p>
            <a href="#" class="btn">Learn More</a>
        </div>
    </div>
  </section>
 );
}


export default AboutUs;