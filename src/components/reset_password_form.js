import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAccessTokenFromPKCE, updatePassword } from '@/lib/auth';

const ResetPasswordForm = ({ accessToken }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    
    try {
        console.log(accessToken);
      const data = await getAccessTokenFromPKCE(accessToken);
      await updatePassword(newPassword);
      setSuccess(true);
      console.log('Password updated successfully');
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Something went wrong. Please try again. " + error.message);
    } finally {
      setLoading(false);
    }
  };


  const containerStyle = {
    padding: '20px',
  };

  const titleStyle = {
    fontFamily: 'var(--font-bebas-neue)',
    textAlign: 'left',
    marginTop: '30px',
  };

  const subtitleStyle = {
    fontFamily: 'var(--font-poppins)',
    textAlign: 'left',
    marginBottom: '20px',
  };

  const errorStyle = {
    color: 'red',
  };

  const buttonStyle = {
    backgroundColor: '#F16023',
    color: '#FFFFFF',
    fontFamily: 'var(--font-poppins)',
  };

  if (success) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Password Reset Successful!</h2>
        <p style={subtitleStyle}>
          Your password has been successfully updated. You can now login with your new password.
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Change Your Password</h2>

      <p style={subtitleStyle}>
        To reset your password, please fill out the form below.
      </p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label" style={{ fontFamily: 'var(--font-poppins)' }}>New Password</label>
          <div className="input-group">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="form-control"
              id="newPassword"
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

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label" style={{ fontFamily: 'var(--font-poppins)' }}>Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control"
              id="confirmPassword"
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

        {error && <p style={errorStyle}>{error}</p>}

        <div className="d-flex justify-content-center">
          <button
            style={buttonStyle}
            type="submit"
            className="btn"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
