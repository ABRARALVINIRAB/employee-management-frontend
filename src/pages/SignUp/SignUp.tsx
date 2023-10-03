import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    employeeId: '',
  });

  const [isValid, setIsValid] = useState(true); // Initially set to true
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    let valid = true;

    if (name === 'phoneNumber' || name === 'employeeId') {
      if (!/^\d+$/.test(value)) {
        valid = false;
      }
    }

    setIsValid(valid); // Update isValid based on the validation result

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Please provide a valid number.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users/create-user',
        formData
      );

      if (response.status === 200) {
        alert('Account created! Wait for admin approval.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating account');
    }
  };
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]*"
            required
          />
          {!isValid && <span className="error-message">Please provide a valid number.</span>}
        </div>
        <div className="form-field">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            pattern="[0-9]*"
            required
          />
          {!isValid && <span className="error-message">Please provide a valid number.</span>}
        </div>
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
