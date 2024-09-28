import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams and Link for routing
import axiosInstance from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const CarDetails = () => {
  const { id } = useParams(); // Get car ID from the route
  const [carDetails, setCarDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status

  useEffect(() => {
    // Fetch car details by ID
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/car-models/${id}/`);
        setCarDetails(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();

    // Check if the user is logged in (assuming token is stored in local storage)
    const token = localStorage.getItem('access_token'); 
    console.log(token)// Or any other way you store the auth state
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, [id]);

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-md-6">
          <img src={carDetails.image} className="img-fluid" alt={`${carDetails.name}`} />
        </div>
        <div className="col-md-6">
          <h1>{carDetails.brand} {carDetails.name} ({carDetails.year})</h1>
          <p><strong>Price:</strong> {carDetails.price}</p>
          <p><strong>Engine:</strong> {carDetails.engine}</p>
          <p><strong>Power:</strong> {carDetails.power}</p>
          <p><strong>Seating Capacity:</strong> {carDetails.seating_capacity}</p>
          <p><strong>Drive Type:</strong> {carDetails.drive_type}</p>
          <p><strong>Ground Clearance:</strong> {carDetails.ground_clearance}</p>
          <p><strong>Torque:</strong> {carDetails.torque}</p>
          <p><strong>Review:</strong> {carDetails.review}/5</p>
          <p><strong>Description:</strong> {carDetails.description}</p>

          {/* Conditionally render the appointment button or login alert */}
          {isLoggedIn ? (
            <Link to={`/book-appointment/${id}`} className="btn btn-primary mt-3">
              Book Appointment
            </Link>
          ) : (
            <div className="alert alert-warning mt-3" role="alert">
              Please <Link to="/login" className="alert-link">login</Link> to book an appointment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
