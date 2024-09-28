import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State to store error message
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };
  const handleError=(e)=>{
    setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData); // Call login function from context
    } catch (error) {
      // Handle login error, typically a 400 or 401 from the backend
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid credentials. Please check your username and password.');
      }else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg " style={{ maxWidth: '400px', width: '100%', marginBottom: '150px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={handleError}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onFocus={handleError}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        {/* Add the text and link to the Sign-up page */}
        <div className="text-center mt-3">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
