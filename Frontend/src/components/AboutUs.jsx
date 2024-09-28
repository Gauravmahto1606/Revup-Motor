import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your form submission logic here (e.g., send data to backend)
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-white text-center p-5" style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/40105.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <h1 className="display-4" >Welcome to RevupsMotor</h1>
          <p className="lead">Your one-stop destination for top-tier car services and a wide selection of vehicles.</p>
          <Link to="/appointments" className="btn btn-primary btn-lg mt-3">Check Appointment</Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-section" className="p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>About Us</h2>
              <p>At RevupsMotor, we pride ourselves on offering exceptional automotive services and a vast selection of premium vehicles. With years of experience in the industry, our mission is to provide a seamless and satisfying customer experience, whether you're looking for service, a car upgrade, or guidance on vehicle care.</p>
            </div>
            <div className="col-md-6">
              <img src="https://graphicsfamily.com/wp-content/uploads/edd/2020/05/Auto-Company-Ad-Banner-Design-1180x664.jpg" alt="Cars" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="bg-light p-5">
        <div className="container">
          <h2 className="text-center">Our Services</h2>
          <div className="row text-center mt-4 ">
            <div className="col-md-4 card ">
              <img src="https://th.bing.com/th/id/OIP.lTj65A4w8Teio-Tu54lfLQHaEt?rs=1&pid=ImgDetMain" alt="Car Servicing" className="img-fluid mb-3 service-image" />
              <h4 className="mt-3">Check Appointment</h4>
              <p>From Website user can see the booked Appointment Done By Him.</p>
            </div>
            <div className="col-md-4 card">
              <img src="https://crocoblock.com/wp-content/uploads/2022/03/Wishlist-%E2%80%93-CarDealer-1x.png" alt="Wide Range of Cars" className="img-fluid mb-3 service-image" />
              <h4 className="mt-3">Wide Range of Cars</h4>
              <p>Explore our wide selection of new and pre-owned vehicles ready for test drives and purchase.</p>
            </div>
            <div className="col-md-4 card">
              <img src="https://cdn.dribbble.com/users/2028831/screenshots/9520585/anupkantideb2017_gmail.com_4x.png" alt="Appointments" className="img-fluid mb-3 service-image" />
              <h4 className="mt-3">Book Appointments</h4>
              <p>Book an appointment easily through our website for a test drive or a car service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment-section" className="bg-light p-5">
        <div className="container">
          <h2 className="text-center">Book an Appointment</h2>
          <form id="appointment-form" className="mt-4" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="service" className="form-label">Service Type</label>
              <select className="form-select" id="service" value={formData.service} onChange={handleInputChange} required>
                <option value="">Select Service</option>
                <option value="car-service">Car Service</option>
                <option value="test-drive">Test Drive</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Preferred Date</label>
              <input type="date" className="form-control" id="date" value={formData.date} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
