import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API requests

const PopularBrands = () => {
  const [brandsData, setBrandsData] = useState([]); // State to hold brand data
  const [visibleBrands, setVisibleBrands] = useState([]); // Initialize with an empty array
  const [isViewAll, setIsViewAll] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch brand data from the backend
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/brands/'); // Update the correct URL
        setBrandsData(response.data);
        setVisibleBrands(response.data.slice(0, 5)); // Show the first 5 brands initially
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };
    fetchBrands();
  }, []);

  const handleNext = () => {
    const nextIndex = brandsData.findIndex(brand => brand.id === visibleBrands[0]?.id) + 5;
    setVisibleBrands(brandsData.slice(nextIndex, nextIndex + 5));
  };

  const handlePrev = () => {
    const prevIndex = brandsData.findIndex(brand => brand.id === visibleBrands[0]?.id) - 5;
    setVisibleBrands(brandsData.slice(prevIndex, prevIndex + 5));
  };

  const handleViewAll = () => {
    setIsViewAll(true);
  };

  const handleShowLess = () => {
    setIsViewAll(false);
    setVisibleBrands(brandsData.slice(0, 5)); // Show the first 5 brands again
  };

  const handleBrandClick = (brandName) => {
    navigate(`/car-models/brand/${brandName}`); // Navigate to the brand's car models page
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="mb-4 text-center" id="popular-brands">Popular Car Brands</h2>

      {!isViewAll ? (
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={brandsData[0]?.id === visibleBrands[0]?.id}>
            &#8249; {/* Left Arrow */}
          </button>

          <div className="row justify-content-center w-100">
            {Array.isArray(visibleBrands) && visibleBrands.length > 0 ? ( // Check if visibleBrands is an array
              visibleBrands.map(brand => (
                <div key={brand.id} className="col-6 col-md-4 col-lg-2 text-center mb-3" onClick={() => handleBrandClick(brand.name)} style={{ cursor: 'pointer' }}>
                  <img src={brand.image} alt={brand.name} className="img-fluid mb-2" style={{ width: '100px', height: '100px' }} />
                  <p>{brand.name}</p>
                </div>
              ))
            ) : (
              <p>No brands to display</p> // Add fallback in case visibleBrands is empty
            )}
          </div>

          <button className="btn btn-secondary" onClick={handleNext} disabled={brandsData[brandsData.length - 1]?.id === visibleBrands[visibleBrands.length - 1]?.id}>
            &#8250; {/* Right Arrow */}
          </button>
        </div>
      ) : (
        <div className="row justify-content-center">
          {brandsData.map(brand => (
            <div key={brand.id} className="col-6 col-md-4 col-lg-2 mb-3 text-center" onClick={() => handleBrandClick(brand.name)} style={{ cursor: 'pointer' }}>
              <img src={brand.image} alt={brand.name} className="img-fluid mb-2" style={{ width: '100px', height: '100px' }} />
              <p>{brand.name}</p>
            </div>
          ))}
        </div>
      )}

      {!isViewAll ? (
        <div className="mt-4 text-center">
          <button className="btn btn-primary" onClick={handleViewAll}>
            Show More Brands
          </button>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <button className="btn btn-primary" onClick={handleShowLess}>
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularBrands;
