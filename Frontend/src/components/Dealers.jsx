import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import axiosInstance from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store user input

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axiosInstance.get('/dealers/');
        setDealers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching dealers:', error);
      }
    };
    fetchDealers();
  }, []);

  // Filter dealers based on search term
  const filteredDealers = dealers.filter((dealer) =>
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4" style={{ paddingBottom: filteredDealers.length > 0? "0px": '237px' }}>
      <h1 className="mb-4">Dealers</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by Dealer name or Location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
      />
      <div className="row">
        {filteredDealers.length > 0 ? (
          filteredDealers.map((dealer) => (
            <div className="col-md-4 mb-4" key={dealer.id}>
              <div className="card h-100">
                {/* Dealer Image (if available) */}
                {dealer.image && (
                  <img
                    src={dealer.image}
                    className="card-img-top"
                    alt={`${dealer.name}`}
                    style={{height:"150px"}}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{dealer.name}</h5>
                  <p className="card-text">Location: {dealer.location}</p>
                  <p className="card-text">Phone: {dealer.phone}</p>
                  {/* More Details Button */}
                  <Link to={`/dealers/${dealer.id}`} className="btn btn-primary">
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No dealers found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default Dealers;
