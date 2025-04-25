import { useEffect, useState } from 'react';
import { setSessionWithToken, updatePassword } from '../lib/auth'; 

const ResetPasswordForm = ({ accessToken }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const setupSession = async () => {
      const { error } = await setSessionWithToken(accessToken);
      if (error) {
        setError("Token is invalid or expired.");
      } else {
        setSessionReady(true);
      }
    };
    if (accessToken) {
      setupSession();
    }
  }, [accessToken]);

  const validatePassword = (password) => {
    if (password.length === 0) return "Password cannot be empty";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError('');
    setLoading(true);

    const { error } = await updatePassword(newPassword);

    if (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } else {
      alert("Password updated successfully!");
    }

    setLoading(false);
  };

  if (!sessionReady) {
    return <p className="text-center mt-5">Preparing reset session...</p>;
  }

  return (
    <div className='container'>
      <h2 className='mt-5'>Change Your Password</h2>

      <form className='mt-4' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex justify-content-center">
          <button 
            type="submit" 
            className="btn btn-primary"
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
