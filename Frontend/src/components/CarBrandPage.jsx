import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axios';  // Your custom axios instance

const CarBrandPage = () => {
  const { brandName } = useParams(); // Get the brand name from the URL
  const [carModels, setCarModels] = useState([]);
  const [brandId, setBrandId] = useState(null); // Store the brand ID

  useEffect(() => {
    // Fetch the brand ID based on the brand name
    const fetchBrandId = async () => {
      try {
        console.log("Fetching brand ID for:", brandName);
        const response = await axiosInstance.get(`/brands/`);
        const brands = response.data;

        // Find the brand object by name
        const brand = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());

        if (brand) {
          setBrandId(brand.id); // Set the brand ID if found
          console.log("Brand ID:", brand.id);
        } else {
          console.error(`Brand "${brandName}" not found.`);
        }
      } catch (error) {
        console.error('Error fetching brand information', error);
      }
    };

    fetchBrandId();
  }, [brandName]);

  useEffect(() => {
    // Fetch the car models for the given brand ID
    const fetchCarModels = async () => {
      if (brandId !== null) {  // Only fetch if the brandId is set
        try {
          console.log("Fetching car models for brand ID:", brandId);
          const response = await axiosInstance.get(`/car-models/brand/?brand=${brandId}`);
          setCarModels(response.data);
          console.log("Car Models Data:", response.data);
        } catch (error) {
          console.error('Error fetching car models', error);
        }
      }
    };

    fetchCarModels();
  }, [brandId]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{brandName} Car Models</h2>
      
      <div className="row">
        {carModels.length > 0 ? (
          carModels.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card h-100">
                <img src={car.image} className="card-img-top" alt={`${car.name}`} />
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.name}
                  </h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${car.price}
                  </p>
                  <p className="card-text">
                    <strong>Year:</strong> {car.year}
                  </p>
                  <Link to={`/car-models/${car.id}`} className="btn btn-primary">
                    Show More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12" style={{paddingBottom:"172px"}}>
            <div className="alert alert-warning text-center" role="alert">
              <h4 className="alert-heading">No {brandName} cars found</h4>
              <p>Sorry, we couldn't find any cars for the brand "{brandName}".</p>
              <hr />
              <p className="mb-0">
                Try exploring other brands or{' '}
                <Link to="/#popular-brands" className="alert-link">
                  go back to the popular brands list
                </Link>
                !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBrandPage;
