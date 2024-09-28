import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import AuthContext from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom'; // For route params and navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

const UpdateAppointment = () => {
  const { appointmentId } = useParams(); // Get the appointment ID from the route
  const { user } = useContext(AuthContext); // Get the user from context
  const [appointmentDate, setAppointmentDate] = useState(''); // Appointment date
  const [dealers, setDealers] = useState([]); // List of dealers
  const [selectedDealer, setSelectedDealer] = useState(''); // Selected dealer
  const [carModel, setCarModel] = useState(''); // Car model for appointment
  const [isLoadingDealers, setIsLoadingDealers] = useState(true); // Loading state
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(true); // Loading state for appointment data
  const navigate = useNavigate();

  // Fetch appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axiosInstance.get(`/appointments/${appointmentId}/`);
        const appointment = response.data;
        setAppointmentDate(appointment.appointment_date);
        setSelectedDealer(appointment.dealer);
        setCarModel(appointment.car_model);
        setIsLoadingAppointment(false);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  // Fetch dealers
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axiosInstance.get('/dealers/');
        setDealers(response.data);
        setIsLoadingDealers(false);
      } catch (error) {
        console.error('Error fetching dealers:', error);
        setIsLoadingDealers(false);
      }
    };

    fetchDealers();
  }, []);

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/appointments/${appointmentId}/`, {
        car_model: carModel,
        dealer: selectedDealer,
        appointment_date: appointmentDate,
      });
      alert('Appointment updated successfully!');
      navigate('/appointments'); // Redirect to the appointments list
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update the appointment');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Appointment</h2>
      {isLoadingAppointment ? (
        <p>Loading appointment details...</p>
      ) : (
        <form onSubmit={handleUpdateAppointment}>
          <div className="mb-3">
            <label htmlFor="appointmentDate" className="form-label">
              Select Appointment Date
            </label>
            <input
              type="datetime-local"
              id="appointmentDate"
              className="form-control"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dealerSelect" className="form-label">
              Select Dealer
            </label>
            <select
              id="dealerSelect"
              className="form-select"
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              required
              disabled={isLoadingDealers} // Disable select while dealers are loading
            >
              <option value="" disabled>
                {isLoadingDealers ? 'Loading dealers...' : 'Select a dealer'}
              </option>
              {dealers.map((dealer) => (
                <option key={dealer.id} value={dealer.id}>
                  {dealer.name} - {dealer.location}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Update Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateAppointment;
