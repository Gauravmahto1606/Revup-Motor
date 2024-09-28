import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center text-lg-start mt-auto" >
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We offer the best car reviews, latest models, and the most comprehensive car buying guide. 
              Find your perfect car with us!
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light">Home</Link></li>
              <li><Link to="/about_us" className="text-light">About</Link></li>
              <li><Link to="/contact" className="text-light">Contact</Link></li>
              <li><Link to="/car-models" className="text-light">All Cars</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled">
              <li>Email: RevUp Motor@carwebsite.com</li>
              <li>Phone: +91 9856321470</li>
              <li>Location: 123 Car Street, Ahmedabad, India</li>
            </ul>
          </div>

          
        </div>
      </div>

      <div className="text-center p-3 bg-secondary">
        © {new Date().getFullYear()} Car Website. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
