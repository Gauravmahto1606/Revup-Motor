import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const DealerDetail = () => {
  const { id } = useParams(); // Extract dealer ID from the route
  const [dealer, setDealer] = useState(null); // Dealer data state

  useEffect(() => {
    const fetchDealerDetails = async () => {
      try {
        const response = await axiosInstance.get(`/dealers/${id}/`); // Fetch dealer details
        setDealer(response.data);
      } catch (error) {
        console.error('Error fetching dealer details:', error);
      }
    };

    fetchDealerDetails();
  }, [id]);

  if (!dealer) {
    return <p>Loading dealer details...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dealer: {dealer.name}</h1>
      <div className="card mb-4">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={dealer.image} className="img-fluid rounded-start" alt={dealer.name} style={{height:"200px"}} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{dealer.name}</h5>
              <p className="card-text">Location: {dealer.location}</p>
              <p className="card-text">Phone: {dealer.phone}</p>
              <Link to="#" className="btn btn-primary">
                Contact Dealer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Display related car models */}
      <h2>Available Car Models</h2>
      <div className="row">
        {dealer.car.map((car) => (
          <div className="col-md-4 mb-4" key={car.id}>
            <div className="card h-100">
              <img src={car.image} className="card-img-top" alt={`${car.name}`} />
              <div className="card-body">
                <h5 className="card-title">
                  {car.brand} {car.name}
                </h5>
                <p className="card-text">Price: ${car.price}</p>
                <p className="card-text">Year: {car.year}</p>
                <Link to={`/car-models/${car.id}`} className="btn btn-primary">
                  Show More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerDetail;
