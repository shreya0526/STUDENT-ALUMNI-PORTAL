import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from'react-redux';
import { userAction } from '../store/userSlice';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loggedInUser = useSelector(store=>store.loggedInUser);
    console.log('loggedInUser:', loggedInUser);
    const dispatch = useDispatch();
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
        const params= {
                    email: formData.email,
                    password: formData.password
                }
        fetch("http://localhost:8080/user/login",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => response.json()).
        then(data => {
            dispatch(userAction.setUser(data))

          })

        // try {
        //     const res = await axios.get('http://localhost:8080/user/login', {
        //         params: {
        //             email: formData.email,
        //             password: formData.password
        //         }
        //     });

        //     if (!res.data) {
        //         setError('Invalid email or password');
        //     } else {
        //         alert(`✅ Login Successful!\n\nResponse:\n${JSON.stringify(res.data, null, 2)}`);
        //         dispatch(userAction.setUser(res.data))
        //         console.log(res.data)
        //         setFormData({ email: '', password: '' });
        //     }
        // } catch (err) {
        //     if (err.response) {
        //         const status = err.response.status;
        //         if (status === 401 || status === 404) {
        //             setError('Invalid email or password');
        //         } else {
        //             setError(err.response.data.message || 'Login failed');
        //         }
        //     } else {
        //         setError('Server not responding. Try again later.');
        //     }
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>

            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        width: '350px',
        margin: '50px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '12px',
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    }
};

export default Login;
