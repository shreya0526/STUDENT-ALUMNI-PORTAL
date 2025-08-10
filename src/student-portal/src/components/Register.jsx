import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirm_password: '', 
    phone_no: '',
    role_id: '',
    city_id: '',
  });

  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/registerlogin/role/all')
      .then((res) => setRoles(res.data))
      .catch(() => setError('Failed to load roles'));

    axios.get('http://localhost:8080/registerlogin/city/all')
      .then((res) => setCities(res.data))
      .catch(() => setError('Failed to load cities'));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ''
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = 'Confirm Password is required';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    if (!formData.phone_no.trim()) {
      newErrors.phone_no = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phone_no)) {
      newErrors.phone_no = 'Phone Number must be 10 digits';
    }
    if (!formData.role_id) {
      newErrors.role_id = 'Please select a role';
    }
    if (!formData.city_id) {
      newErrors.city_id = 'Please select a city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/registerlogin/user/register', formData);
      const user = response.data;

      setMessage('Registration successful!');
      setFormData({
        user_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_no: '',
        role_id: '',
        city_id: '',
      });

      if (formData.role_id === '3') {
        navigate(`/student-details/${user.user_id}`);
      } 
      else if (formData.role_id === '2') {
        navigate(`/alumni-details/${user.user_id}`);
      }
      else {
        navigate('/');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: '500px',
          width: '100%'
        }}>
          <h2 style={{ 
            color: '#800080', 
            textAlign: 'center',
            marginBottom: '25px',
            fontWeight: '600'
          }}>Create Account</h2>

          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}

          <form onSubmit={handleSubmit} style={styles.form} noValidate>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input 
                type="text" 
                name="user_name" 
                value={formData.user_name} 
                onChange={handleChange} 
                style={styles.input}
              />
              {errors.user_name && <p style={styles.errorText}>{errors.user_name}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                style={styles.input}
              />
              {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                style={styles.input}
              />
              {errors.password && <p style={styles.errorText}>{errors.password}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input 
                type="password" 
                name="confirm_password" 
                value={formData.confirm_password} 
                onChange={handleChange} 
                style={styles.input}
              />
              {errors.confirm_password && <p style={styles.errorText}>{errors.confirm_password}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input 
                type="text" 
                name="phone_no" 
                value={formData.phone_no} 
                onChange={handleChange} 
                style={styles.input}
              />
              {errors.phone_no && <p style={styles.errorText}>{errors.phone_no}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select 
                name="role_id" 
                value={formData.role_id} 
                onChange={handleChange} 
                style={styles.input}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                ))}
              </select>
              {errors.role_id && <p style={styles.errorText}>{errors.role_id}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <select 
                name="city_id" 
                value={formData.city_id} 
                onChange={handleChange} 
                style={styles.input}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
                ))}
              </select>
              {errors.city_id && <p style={styles.errorText}>{errors.city_id}</p>}
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.button,
                background: '#e91e63', // Soft pink
                '&:hover': {
                  background: '#c2185b' // Darker pink on hover
                }
              }}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p style={{ 
            marginTop: '20px', 
            color: '#555',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            Already have an account?{' '}
            <Link 
              to="/" 
              style={{
                color: '#9c27b0', // Medium purple
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Login here
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
  formGroup: {
    marginBottom: '18px',
    position: 'relative'
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
    transition: 'all 0.3s ease',
    marginTop: '10px'
  },
  error: {
    color: '#d32f2f',
    marginBottom: '15px',
    backgroundColor: '#ffebee',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center'
  },
  success: {
    color: '#388e3c',
    marginBottom: '15px',
    backgroundColor: '#e8f5e9',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '12px',
    marginTop: '5px'
  }
};

export default Register;
