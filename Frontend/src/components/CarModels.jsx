import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axiosInstance from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const CarModels = () => {
  const [carModels, setCarModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input
  const [selectedYear, setSelectedYear] = useState(''); // State to store selected year

  useEffect(() => {
    const fetchCarModels = async () => {
      const response = await axiosInstance.get('/car-models/');
      setCarModels(response.data);
    };
    fetchCarModels();
  }, []);

  // Get unique years from the carModels array
  const uniqueYears = [...new Set(carModels.map((car) => car.year))].sort((a, b) => b - a); // Sort in descending order

  // Filter car models based on search term and selected year
  const filteredCarModels = carModels.filter((car) => {
    const matchesSearchTerm = 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = selectedYear ? car.year === Number(selectedYear) : true;

    return matchesSearchTerm && matchesYear;
  });

  return (
      <div className="container mt-4" style={{ paddingBottom: filteredCarModels.length > 0? "0px": '175px' }}>
      <h1 className="mb-4">Car Models</h1>

      {/* Search input */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by Car name or Brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
      />

      {/* Year filter dropdown */}
      <select
        className="form-control mb-4"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)} // Update selected year
      >
        <option value="">Filter by Year</option>
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div className="row">
        {filteredCarModels.length > 0 ? (
          filteredCarModels.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card h-100">
                <img
                  src={car.image}
                  className="card-img-top"
                  alt={`${car.name}`}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.name}
                  </h5>
                  <p className="card-text">Price: {car.price}</p>
                  <p className="card-text">Year: {car.year}</p>
                  <Link to={`/car-models/${car.id}`} className="btn btn-primary">
                    Show More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No car models found for "{searchTerm}" and year "{selectedYear}".</p>
        )}
      </div>
    </div>
  );
};

export default CarModels;
