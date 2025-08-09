
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         user_name: '',
//         email: '',
//         password: '',
//         confirm_password: '', 
//         phone_no: '',
//         role_id: '',
//         city_id: '',
//     });

//     const [errors, setErrors] = useState({});
//     const [roles, setRoles] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:8080/role/all')
//             .then((res) => setRoles(res.data))
//             .catch(() => setError('Failed to load roles'));

//         axios.get('http://localhost:8080/city/all')
//             .then((res) => setCities(res.data))
//             .catch(() => setError('Failed to load cities'));
//     }, []);

//     const handleChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }));

//         setErrors((prev) => ({
//             ...prev,
//             [e.target.name]: ''
//         }));
//     };

//     const validate = () => {
//         const newErrors = {};

//         if (!formData.user_name.trim()) {
//             newErrors.user_name = 'Username is required';
//         }
//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
//         if (!formData.password.trim()) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }
//         if (!formData.confirm_password.trim()) {
//             newErrors.confirm_password = 'Confirm Password is required';
//         } else if (formData.password !== formData.confirm_password) {
//             newErrors.confirm_password = 'Passwords do not match';
//         }
//         if (!formData.phone_no.trim()) {
//             newErrors.phone_no = 'Phone Number is required';
//         } else if (!/^\d{10}$/.test(formData.phone_no)) {
//             newErrors.phone_no = 'Phone Number must be 10 digits';
//         }
//         if (!formData.role_id) {
//             newErrors.role_id = 'Please select a role';
//         }
//         if (!formData.city_id) {
//             newErrors.city_id = 'Please select a city';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');

//         if (!validate()) {
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await axios.post('http://localhost:8080/user/register', formData);
//             const user = response.data;

//             setMessage('Registration successful!');
//             setFormData({
//                 user_name: '',
//                 email: '',
//                 password: '',
//                 confirm_password: '',
//                 phone_no: '',
//                 role_id: '',
//                 city_id: '',
//             });

//             if (formData.role_id === '3') {
//                 navigate(`/student-details/${user.user_id}`);
//             }

//         } catch (err) {
//             setError(err.response?.data?.message || 'Registration failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h2>Register</h2>

//             {error && <p style={styles.error}>{error}</p>}
//             {message && <p style={styles.success}>{message}</p>}

//             <form onSubmit={handleSubmit} style={styles.form} noValidate>
//                 <input
//                     type="text"
//                     name="user_name"
//                     placeholder="Username"
//                     value={formData.user_name}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />
//                 {errors.user_name && <p style={styles.error}>{errors.user_name}</p>}

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />
//                 {errors.email && <p style={styles.error}>{errors.email}</p>}

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />
//                 {errors.password && <p style={styles.error}>{errors.password}</p>}

//                 <input
//                     type="password"
//                     name="confirm_password"
//                     placeholder="Confirm Password"
//                     value={formData.confirm_password}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />
//                 {errors.confirm_password && <p style={styles.error}>{errors.confirm_password}</p>}

//                 <input
//                     type="text"
//                     name="phone_no"
//                     placeholder="Phone Number"
//                     value={formData.phone_no}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />
//                 {errors.phone_no && <p style={styles.error}>{errors.phone_no}</p>}

//                 <select
//                     name="role_id"
//                     value={formData.role_id}
//                     onChange={handleChange}
//                     style={styles.input}
//                 >
//                     <option value="">Select Role</option>
//                     {roles.map((role) => (
//                         <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
//                     ))}
//                 </select>
//                 {errors.role_id && <p style={styles.error}>{errors.role_id}</p>}

//                 <select
//                     name="city_id"
//                     value={formData.city_id}
//                     onChange={handleChange}
//                     style={styles.input}
//                 >
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                         <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
//                     ))}
//                 </select>
//                 {errors.city_id && <p style={styles.error}>{errors.city_id}</p>}

//                 <button type="submit" style={styles.button} disabled={loading}>
//                     {loading ? 'Registering...' : 'Register'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         width: '400px',
//         margin: 'auto',
//         marginTop: '40px',
//         padding: '20px',
//         boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//         borderRadius: '10px',
//         fontFamily: 'Arial, sans-serif',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column'
//     },
//     input: {
//         marginBottom: '12px',
//         padding: '10px',
//         fontSize: '16px'
//     },
//     button: {
//         padding: '10px',
//         fontSize: '16px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer'
//     },
//     error: {
//         color: 'red',
//         fontSize: '14px',
//         marginBottom: '8px'
//     },
//     success: {
//         color: 'green',
//         marginBottom: '10px'
//     }
// };

// export default Register;

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
                navigate(`/alumni-details/${user.user_id}`);}
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
        <div style={styles.container}>
            <h2>Register</h2>

            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form} noValidate>
                <input type="text" name="user_name" placeholder="Username" value={formData.user_name} onChange={handleChange} style={styles.input} />
                {errors.user_name && <p style={styles.error}>{errors.user_name}</p>}

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
                {errors.email && <p style={styles.error}>{errors.email}</p>}

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />
                {errors.password && <p style={styles.error}>{errors.password}</p>}

                <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} style={styles.input} />
                {errors.confirm_password && <p style={styles.error}>{errors.confirm_password}</p>}

                <input type="text" name="phone_no" placeholder="Phone Number" value={formData.phone_no} onChange={handleChange} style={styles.input} />
                {errors.phone_no && <p style={styles.error}>{errors.phone_no}</p>}

                <select name="role_id" value={formData.role_id} onChange={handleChange} style={styles.input}>
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                        <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                    ))}
                </select>
                {errors.role_id && <p style={styles.error}>{errors.role_id}</p>}

                <select name="city_id" value={formData.city_id} onChange={handleChange} style={styles.input}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
                    ))}
                </select>
                {errors.city_id && <p style={styles.error}>{errors.city_id}</p>}

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/" style={{ color: '#007bff' }}>Login here</Link>
            </p>
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
        fontSize: '14px',
        marginBottom: '8px'
    },
    success: {
        color: 'green',
        marginBottom: '10px'
    }
};

export default Register;

