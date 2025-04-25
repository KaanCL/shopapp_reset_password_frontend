"use client";  

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  

const ResetPasswordForm = ({accesToken}) => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    console.log("accesToken : " + accesToken);

  const validatePassword = (password) => {
    if (password.length === 0) {
      return "Password cannot be empty";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return ""; 
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordError = validatePassword(newPassword);
    if(passwordError){
        setError(passwordError);
        return;
    }


    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError(""); 
      console.log("Password changed successfully");
    }
  };

  return (
    <div className='container'>
      <h2 className='mt-5' style={{ fontFamily: 'var(--font-bebas-neue)', textAlign: 'left' }}>Change Your Password</h2>

      <p className="mb-4" style={{ fontFamily: 'var(--font-poppins)', textAlign: 'left' }}>
        To reset your password, please fill out the form below.
      </p>


      <form className='mt-4' onSubmit={handleSubmit}>
    
        <div className='mb-3'>
          <label htmlFor="newPassword" className="form-label" style={{ fontFamily: 'var(--font-poppins)' }}>New Password</label>
          <div className="input-group">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className='form-control'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="input-group-text"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />} 
            </button>
          </div>
        </div>


        <div className='mb-3'>
          <label htmlFor="confirmPassword" className="form-label" style={{ fontFamily: 'var(--font-poppins)' }}>Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className='form-control'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="input-group-text"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} 
            </button>
          </div>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className='d-flex justify-content-center'>
          <button
            style={{
              backgroundColor: "#F16023",
              color: "#FFFFFF",
              fontFamily: 'var(--font-poppins)',
            }}
            type="submit"
            className="btn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
