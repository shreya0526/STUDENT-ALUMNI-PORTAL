import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { userAction } from '../store/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const params = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch("http://localhost:8080/registerlogin/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        let errorMsg = 'Invalid email or password';
        try {
          const errorData = await response.json();
          errorMsg = errorData?.message || errorMsg;
        } catch {}
        setError(errorMsg);
        return;
      }

      const data = await response.json();
      dispatch(userAction.setUser(data));

      const roleId = data.role.role_id;
      if (roleId === 1) {
        navigate('/AdminDashboard');
      } else if (roleId === 2) {
        navigate('/alumnidashboard');
      } else if (roleId === 3) {
        navigate('/StudentDashboard');
      } else {
        setError('Unknown role ID. Contact support.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5e6ff 0%, #ffe6f5 50%, #fff6e6 100%)'
    }}>
      <div style={styles.container}>
        <div style={{
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: '#fffaf0', // Soft cream
          boxShadow: '0 10px 30px rgba(152, 89, 182, 0.2)', // Subtle purple shadow
          border: '1px solid rgba(152, 89, 182, 0.1)',
          maxWidth: '450px',
          width: '100%'
        }}>
          <h2 style={{ 
            color: '#800080', 
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: '600'
          }}>Welcome Back</h2>
          
          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                style={styles.input} 
                required 
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                style={styles.input} 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              style={{
                ...styles.button,
                background: '#9c27b0', // Medium purple
                '&:hover': {
                  background: '#7b1fa2' // Darker purple on hover
                }
              }} 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ 
            marginTop: '20px', 
            color: '#555',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{
                color: '#e91e63', // Soft pink
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#6a1b9a', // Deep purple
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #e0c8ef', // Light purple border
    backgroundColor: '#fffdfa', // Very light cream
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: '#ba68c8', // Lighter purple
      boxShadow: '0 0 0 3px rgba(186, 104, 200, 0.2)',
      outline: 'none'
    }
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    borderRadius: '8px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  error: {
    color: '#d32f2f',
    marginBottom: '15px',
    backgroundColor: '#ffebee',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center'
  }
};

export default Login;
