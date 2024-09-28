import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'; // Assuming axios instance is set up
import { Link } from 'react-router-dom';


function TopReview() {
  const [carModels, setCarModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store user input

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await axiosInstance.get('/car-models/top-reviewed/');
        setCarModels(response.data);
      } catch (error) {
        console.error('Error fetching car models:', error);
      }
    };
    fetchCarModels();
  }, []);

  // Filter car models based on search term
  const filteredCars = carModels.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="container-fluid mt-4"  >
      <h1 className="mb-4 text-center">Featured Cars</h1>

      {/* Search bar */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by car name or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
      />

      <div className="row">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
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
          <p>No cars found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default TopReview;
