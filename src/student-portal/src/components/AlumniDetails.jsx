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
        sector_id: '',
        work_id: '',
        college_ids: [],
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/college/all')
            .then(res => setColleges(res.data))
            .catch(() => setError('Failed to load colleges'));

        axios.get('http://localhost:8081/sector/all')
            .then(res => setSectors(res.data))
            .catch(() => setError('Failed to load sectors'));

        axios.get('http://localhost:8081/work/all')
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

    const handleCollegeChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            let updatedColleges = [...prev.college_ids];
            if (checked) {
                updatedColleges.push(value);
            } else {
                updatedColleges = updatedColleges.filter(id => id !== value);
            }
            return { ...prev, college_ids: updatedColleges };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.sector_id || !formData.work_id || formData.college_ids.length === 0) {
            setError('Please fill all required fields');
            return;
        }

        const payload = {
            userId: Number(userId),
            sectorId: Number(formData.sector_id),
            workId: Number(formData.work_id),
            collegeIds: formData.college_ids.map(Number)
        };

        try {
            await axios.post('http://localhost:8081/register', payload);
            setMessage('Alumnus registered successfully!');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Failed to register alumnus');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Alumni Details</h2>

            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <select name="sector_id" value={formData.sector_id} onChange={handleChange} style={styles.input}>
                    <option value="">Select Sector</option>
                    {sectors.map(sector => (
                        <option key={sector.sector_id} value={sector.sector_id}>
                            {sector.sector_name}
                        </option>
                    ))}
                </select>

                <select name="work_id" value={formData.work_id} onChange={handleChange} style={styles.input}>
                    <option value="">Select Work</option>
                    {works.map(work => (
                        <option key={work.work_id} value={work.work_id}>
                            {work.work_name}
                        </option>
                    ))}
                </select>

                <div style={{ marginBottom: '12px' }}>
                    <label>Select Colleges:</label>
                    {colleges.map(college => (
                        <div key={college.college_id}>
                            <input
                                type="checkbox"
                                value={college.college_id}
                                onChange={handleCollegeChange}
                                checked={formData.college_ids.includes(String(college.college_id))}
                            />
                            {college.college_Name}
                        </div>
                    ))}
                </div>

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
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginBottom: '12px',
        padding: '10px',
        fontSize: '16px'
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '8px'
    },
    success: {
        color: 'green',
        marginBottom: '10px'
    }
};

export default AlumniDetails;
