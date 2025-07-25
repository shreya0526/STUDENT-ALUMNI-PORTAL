import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: '',
        phone_no: '',
        role_id: '',
        city_id: '',
    });

    const [roles, setRoles] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch roles and cities
    useEffect(() => {
        axios.get('http://localhost:8080/role/all')
            .then((res) => setRoles(res.data))
            .catch(() => setError('Failed to load roles'));

        axios.get('http://localhost:8080/city/all')
            .then((res) => setCities(res.data))
            .catch(() => setError('Failed to load cities'));
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        console.log(formData);
        

        try {
            await axios.post('http://localhost:8080/user/register', formData);
            setMessage('Registration successful!');
            setFormData({
                user_name: '',
                email: '',
                password: '',
                phone_no: '',
                role_id: '',
                city_id: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>

            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="user_name"
                    placeholder="Username"
                    value={formData.user_name}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="text"
                    name="phone_no"
                    placeholder="Phone Number"
                    value={formData.phone_no}
                    onChange={handleChange}
                    style={styles.input}
                />

                <select
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleChange}
                    style={styles.input}
                >
                    <option value="">Select Role</option>
                    {roles.map((role) => {
                        return <option value={role.role_id}>{role.role_name}</option>
                    }
                    )}
                </select>

                <select
                    name="city_id"
                    value={formData.city_id}
                    onChange={handleChange}
                    style={styles.input}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => {

                        return <option value={city.city_id}>{city.city_name}</option>
                    }
                    )}
                </select>

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
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
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    },
    success: {
        color: 'green',
        marginBottom: '10px'
    }
};

export default Register;