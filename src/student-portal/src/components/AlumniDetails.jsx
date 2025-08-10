import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlumniDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [works, setWorks] = useState([]);
  const [formData, setFormData] = useState({
    sectorId: '',
    workId: '',
    collegeId: '',  // single college id
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/College')
      .then(res => setColleges(res.data))
      .catch(() => setError('Failed to load colleges'));

    axios.get('http://localhost:8080/api/Sector')
      .then(res => setSectors(res.data))
      .catch(() => setError('Failed to load sectors'));

    axios.get('http://localhost:8080/api/WorkTitle')
      .then(res => setWorks(res.data))
      .catch(() => setError('Failed to load work options'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Check new camelCase keys here
    if (!formData.sectorId || !formData.workId || !formData.collegeId) {
      setError('Please fill all required fields');
      return;
    }

    const payload = {
      userId: Number(userId),
      sectorId: Number(formData.sectorId),
      workId: Number(formData.workId),
      collegeIds: [Number(formData.collegeId)]  // backend expects an array
    };

    try {
      await axios.post('http://localhost:8080/register', payload);
      setMessage('Alumni details registered successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to register alumnus');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#800080' }}>Alumni Details</h2>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="sectorId"  
          value={formData.sectorId}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Sector</option>
          {sectors.map(sector => (
            <option key={sector.sectorId} value={sector.sectorId}>
              {sector.sectorName}
            </option>
          ))}
        </select>

        <select
          name="workId"  
          value={formData.workId}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Work</option>
          {works.map(work => (
            <option key={work.workId} value={work.workId}>
              {work.workName}
            </option>
          ))}
        </select>

        <select
          name="collegeId"  // changed here too
          value={formData.collegeId}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select College</option>
          {colleges.map(college => (
            <option key={college.collegeId} value={college.collegeId}>
              {college.collegeName}
            </option>
          ))}
        </select>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
    marginTop: '40px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(255, 192, 203, 0.3)', // Light pink shadow
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFFDD0', // Cream background
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '12px',
    padding: '10px',
    fontSize: '16px',
    borderColor: '#FFC0CB', // Light pink border
    color: '#4B0082', // Dark purple text
    backgroundColor: '#FFFDD0', // Cream background for inputs
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#FF69B4', // Medium pink button
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  error: {
    color: '#DC3545', // Standard red for errors
    fontSize: '14px',
    marginBottom: '8px'
  },
  success: {
    color: '#28A745', // Standard green for success
    marginBottom: '10px'
  }
};

export default AlumniDetails;
