import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../axios';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const { user } = useContext(AuthContext); // Use AuthContext to get user
  const [dealers, setDealers] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not logged in
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get('/appointments/');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments by user ID
  useEffect(() => {
    if (user) {
      const userAppointments = appointments
        .filter((appointment) => appointment.user.id === user.id)
        .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));
      setFilteredAppointments(userAppointments);
    }
  }, [appointments, user]);

  // Fetch dealer details for each appointment's dealer
  useEffect(() => {
    const fetchDealers = async () => {
      const uniqueDealerIds = [...new Set(filteredAppointments.map((appointment) => appointment.dealer))];
      const dealerPromises = uniqueDealerIds.map((id) => axiosInstance.get(`/dealers/${id}/`));

      try {
        const dealerResponses = await Promise.all(dealerPromises);
        const dealersMap = {};
        dealerResponses.forEach((response) => {
          dealersMap[response.data.id] = response.data;
        });
        setDealers(dealersMap);
      } catch (error) {
        console.error('Error fetching dealer details:', error);
      }
    };

    if (filteredAppointments.length > 0) {
      fetchDealers();
    }
  }, [filteredAppointments]);

  // Handle Delete Appointment
  const handleDelete = async (appointmentId) => {
    try {
      await axiosInstance.delete(`/appointments/${appointmentId}/`);
      setFilteredAppointments(filteredAppointments.filter((app) => app.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Handle Update Appointment
  const handleUpdate = (appointmentId, carId) => {
    navigate(`/appointments/update/${appointmentId}`);
    console.log('Update appointment:', 'App Id : ', appointmentId, 'car Id :', carId);
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while authentication is being checked
  }

  return (
    <div
      className="container mt-4 mb-5"
      style={{ paddingBottom: filteredAppointments.length > 0 ? (filteredAppointments.length > 1 ? '0px' : '99px') : '250px' }}
    >
      <h1 className="mb-4">Your Appointments</h1>
      {filteredAppointments.length > 0 ? (
        <div className="list-group">
          {filteredAppointments.map((appointment) => {
            const dealer = dealers[appointment.dealer];
            return (
              <div className="list-group" key={appointment.id}>
                <div className="list-group-item mt-3">
                  <h5 className="mb-1">
                    Car: {dealer?.car.find((car) => car.id === appointment.car_model)?.name || 'Car not found'} <br />
                    Dealer: {dealer?.name || 'Dealer not found'}
                  </h5>
                  <p className="mb-1">
                    <strong>Appointment Date:</strong> {new Date(appointment.appointment_date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Username:</strong> {appointment.user.username}
                  </p>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(appointment.id)}>
                    Delete
                  </button>
                  <button className="btn btn-primary" onClick={() => handleUpdate(appointment.id, appointment.car_model)}>
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
