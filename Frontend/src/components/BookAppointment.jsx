// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // For route params and navigation
// import axiosInstance from '../axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const BookAppointment = () => {
//   const { id, appointmentId } = useParams(); // Get car ID and optional appointment ID from the route
//   const [appointmentDate, setAppointmentDate] = useState(''); // Appointment date state
//   const [dealers, setDealers] = useState([]); // List of dealers for the car
//   const [selectedDealer, setSelectedDealer] = useState(''); // Selected dealer
//   const [appointmentDealerId, setAppointmentDealerId] = useState(null); // Dealer ID from the appointment
//   const [isLoadingDealers, setIsLoadingDealers] = useState(true); // To track dealer loading state
//   const navigate = useNavigate();

//   // Fetch dealers who have the car when component loads
//   useEffect(() => {
//     const fetchDealers = async () => {
//       try {
//         const response = await axiosInstance.get('/dealers/'); // Fetch dealers from API
//         const filteredDealers = response.data.filter((dealer) =>
//           dealer.car.some((car) => car.id === parseInt(id)) // Filter dealers by car ID
//         );
//         setDealers(filteredDealers);
//         setIsLoadingDealers(false); // Dealers are loaded
//       } catch (error) {
//         console.error('Error fetching dealers:', error);
//         setIsLoadingDealers(false); // In case of error, dealers are considered loaded
//       }
//     };

//     fetchDealers();
//   }, [id]);

//   // Fetch existing appointment details if we're updating
//   useEffect(() => {
//     if (appointmentId) {
//       const fetchAppointment = async () => {
//         try {
//           const response = await axiosInstance.get(`/appointments/${appointmentId}/`);
//           const appointment = response.data;
//           setAppointmentDate(appointment.appointment_date); // Set the date from the existing appointment
//           setAppointmentDealerId(appointment.dealer); // Set the dealer ID from the existing appointment
//         } catch (error) {
//           console.error('Error fetching appointment details:', error);
//         }
//       };

//       fetchAppointment();
//     }
//   }, [appointmentId]);

//   // Set selected dealer once dealers and appointment dealer are loaded
//   useEffect(() => {
//     if (!isLoadingDealers && appointmentDealerId) {
//       const dealerExists = dealers.some((dealer) => dealer.id === appointmentDealerId);
//       if (dealerExists) {
//         setSelectedDealer(appointmentDealerId); // Set the selected dealer if the appointment exists
//       }
//     }
//   }, [isLoadingDealers, appointmentDealerId, dealers]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (appointmentId) {
//         // Update existing appointment
//         await axiosInstance.put(`/appointments/${appointmentId}/`, {
//           car_model: id,
//           dealer: selectedDealer,
//           appointment_date: appointmentDate,
//         });
//         alert('Appointment updated successfully!');
//       } else {
//         // Create a new appointment
//         await axiosInstance.post('/appointments/', {
//           car_model: id,
//           dealer: selectedDealer,
//           appointment_date: appointmentDate,
//         });
//         alert('Appointment booked successfully!');
//       }

//       navigate(`/appointments`); // Redirect back to Appointments page
//     } catch (error) {
//       console.error('Error booking/updating appointment:', error);
//       alert('Failed to book/update the appointment');
//     }
//   };

//   return (
//     <div className="container mt-4 mb-4" style={{paddingBottom:"131px"}}>
//       <h2>{appointmentId ? 'Update Appointment' : 'Book Appointment'}</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="appointmentDate" className="form-label">Select Appointment Date</label>
//           <input
//             type="datetime-local"
//             id="appointmentDate"
//             className="form-control"
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="dealerSelect" className="form-label">Select Dealer</label>
//           <select
//             id="dealerSelect"
//             className="form-select"
//             value={selectedDealer}
//             onChange={(e) => setSelectedDealer(e.target.value)}
//             required
//             disabled={isLoadingDealers} // Disable the select box while dealers are loading
//           >
//             <option value="" disabled>{isLoadingDealers ? 'Loading dealers...' : 'Select a dealer'}</option>
//             {dealers.map((dealer) => (
//               <option key={dealer.id} value={dealer.id}>
//                 {dealer.name} - {dealer.location}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           {appointmentId ? 'Update Appointment' : 'Book Appointment'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookAppointment;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For route params and navigation
import axiosInstance from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookAppointment = () => {
  const { id, appointmentId } = useParams(); // Get car ID and optional appointment ID from the route
  const [appointmentDate, setAppointmentDate] = useState(''); // Appointment date state
  const [dealers, setDealers] = useState([]); // List of dealers for the car
  const [selectedDealer, setSelectedDealer] = useState(''); // Selected dealer
  const [appointmentDealerId, setAppointmentDealerId] = useState(null); // Dealer ID from the appointment
  const [isLoadingDealers, setIsLoadingDealers] = useState(true); // To track dealer loading state
  const navigate = useNavigate();

  // Get the current date and time formatted for the input field
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (`0${now.getMonth() + 1}`).slice(-2); // Add leading zero
    const day = (`0${now.getDate()}`).slice(-2);
    const hours = (`0${now.getHours()}`).slice(-2);
    const minutes = (`0${now.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [minDateTime, setMinDateTime] = useState(getCurrentDateTime()); // Minimum date allowed for booking

  // Fetch dealers who have the car when component loads
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axiosInstance.get('/dealers/'); // Fetch dealers from API
        const filteredDealers = response.data.filter((dealer) =>
          dealer.car.some((car) => car.id === parseInt(id)) // Filter dealers by car ID
        );
        setDealers(filteredDealers);
        setIsLoadingDealers(false); // Dealers are loaded
      } catch (error) {
        console.error('Error fetching dealers:', error);
        setIsLoadingDealers(false); // In case of error, dealers are considered loaded
      }
    };

    fetchDealers();
  }, [id]);

  // Fetch existing appointment details if we're updating
  useEffect(() => {
    if (appointmentId) {
      const fetchAppointment = async () => {
        try {
          const response = await axiosInstance.get(`/appointments/${appointmentId}/`);
          const appointment = response.data;
          setAppointmentDate(appointment.appointment_date); // Set the date from the existing appointment
          setAppointmentDealerId(appointment.dealer); // Set the dealer ID from the existing appointment
        } catch (error) {
          console.error('Error fetching appointment details:', error);
        }
      };

      fetchAppointment();
    }
  }, [appointmentId]);

  // Set selected dealer once dealers and appointment dealer are loaded
  useEffect(() => {
    if (!isLoadingDealers && appointmentDealerId) {
      const dealerExists = dealers.some((dealer) => dealer.id === appointmentDealerId);
      if (dealerExists) {
        setSelectedDealer(appointmentDealerId); // Set the selected dealer if the appointment exists
      }
    }
  }, [isLoadingDealers, appointmentDealerId, dealers]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the selected appointment date is in the past
    if (new Date(appointmentDate) < new Date()) {
      alert('You cannot book an appointment in the past. Please select a future date and time.');
      return;
    }

    try {
      if (appointmentId) {
        // Update existing appointment
        await axiosInstance.put(`/appointments/${appointmentId}/`, {
          car_model: id,
          dealer: selectedDealer,
          appointment_date: appointmentDate,
        });
        alert('Appointment updated successfully!');
      } else {
        // Create a new appointment
        await axiosInstance.post('/appointments/', {
          car_model: id,
          dealer: selectedDealer,
          appointment_date: appointmentDate,
        });
        alert('Appointment booked successfully!');
      }

      navigate(`/appointments`); // Redirect back to Appointments page
    } catch (error) {
      console.error('Error booking/updating appointment:', error);
      alert('Failed to book/update the appointment');
    }
  };

  return (
    <div className="container mt-4 mb-4" style={{ paddingBottom: "131px" }}>
      <h2>{appointmentId ? 'Update Appointment' : 'Book Appointment'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">Select Appointment Date</label>
          <input
            type="datetime-local"
            id="appointmentDate"
            className="form-control"
            value={appointmentDate}
            min={minDateTime} // Set the minimum date to the current date and time
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dealerSelect" className="form-label">Select Dealer</label>
          <select
            id="dealerSelect"
            className="form-select"
            value={selectedDealer}
            onChange={(e) => setSelectedDealer(e.target.value)}
            required
            disabled={isLoadingDealers} // Disable the select box while dealers are loading
          >
            <option value="" disabled>{isLoadingDealers ? 'Loading dealers...' : 'Select a dealer'}</option>
            {dealers.map((dealer) => (
              <option key={dealer.id} value={dealer.id}>
                {dealer.name} - {dealer.location}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {appointmentId ? 'Update Appointment' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
