// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import CarModels from './components/CarModels';
import Dealers from './components/Dealers';
import Appointments from './components/Appointments';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar'; // Import Navbar
import Home from './components/Home';
import CarDetails from './components/CarDetails';
import DealerDetail from './components/DealerDetail';
import BookAppointment from './components/BookAppointment';
import PagesNotFound from './components/PagesNotFound';
import Footer from './components/Footer';
import CarBrandPage from './components/CarBrandPage';
import UpdateAppointment from './components/UpdateAppointment';
import AboutUs from './components/AboutUs';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Add Navbar here */}
        <div className='container-fluid' style={{"margin":"0px","padding":"0px"}}>
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/car-models" element={<CarModels />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/car-models/:id" element={<CarDetails />} />
            <Route path="/dealers" element={<Dealers/>} />
            <Route path="/dealers/:id" element={<DealerDetail/>} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
            <Route path="/appointments/update/:appointmentId" element={<UpdateAppointment/>} />
            <Route path="/about_us" element={<AboutUs/>} />
            <Route path="/*" element={<PagesNotFound />} />
            <Route path="/car-models/brand/:brandName" element={<CarBrandPage />} />

          </Routes>
        </div>

        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
