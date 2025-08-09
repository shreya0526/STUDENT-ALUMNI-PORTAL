// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';  
// import { userAction } from '../store/userSlice';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const loggedInUser = useSelector(store => store.loggedInUser);
//     const dispatch = useDispatch();
//     const navigate = useNavigate(); 

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         const params = {
//             email: formData.email,
//             password: formData.password
//         };

//       try {
//     const response = await fetch("http://localhost:8080/user/login", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(params)
//     });

//     if (!response.ok) {
//         let errorMsg = 'Invalid email or password';
//         try {
//             const errorData = await response.json();
//             errorMsg = errorData?.message || errorMsg;
//         } catch (jsonErr) {
//             console.warn("Failed to parse error JSON:", jsonErr);
//         }
//         setError(errorMsg);
//         return;
//     }

//     const data = await response.json();
//     console.log("Login response data:", data);
//     dispatch(userAction.setUser(data));

//     const roleId = data.role.role_id;
//     if (roleId === 1) {
//         navigate('/AdminDashboard');
//     } else if (roleId === 2) {
//         navigate('/alumnidashboard');
//     } else if (roleId === 3) {
//         navigate('/StudentDashboard');
//     } else {
        
//         setError('Unknown role ID. Contact support.');
//     }
// } catch (err) {
//     console.error("Login error:", err);
//     setError('Server error. Try again later.');
// } finally {
//     setLoading(false);
// }
//     }

//     return (
//         <div style={styles.container}>
//             <h2>Login</h2>
//             {error && <p style={styles.error}>{error}</p>}

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     style={styles.input}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     style={styles.input}
//                     required
//                 />
//                 <button type="submit" style={styles.button} disabled={loading}>
//                     {loading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         width: '350px',
//         margin: '50px auto',
//         padding: '20px',
//         boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//         borderRadius: '10px',
//         fontFamily: 'Arial, sans-serif',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     input: {
//         marginBottom: '12px',
//         padding: '10px',
//         fontSize: '16px',
//     },
//     button: {
//         padding: '10px',
//         fontSize: '16px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     error: {
//         color: 'red',
//         marginBottom: '10px',
//     }
// };

// export default Login;

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
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p style={{ marginTop: '10px' }}>
                Don’t have an account? <Link to="/register" style={{ color: '#007bff' }}>Register here</Link>
            </p>
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
