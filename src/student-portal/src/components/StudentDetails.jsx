// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const StudentDetails = () => {
//     const { userId } = useParams();

//     const [colleges, setColleges] = useState([]);
//     const [skills, setSkills] = useState([]);
//     const [formData, setFormData] = useState({
//         college_id: '',
//         skill_ids: [],
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:8081/college/all')
//             .then((res) => setColleges(res.data))
//             .catch(() => setError('Failed to load colleges'));

//         axios.get('http://localhost:8081/skillset/all')
//             .then((res) => setSkills(res.data))
//             .catch(() => setError('Failed to load skills'));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSkillChange = (e) => {
//         const { value, checked } = e.target;
//         setFormData((prev) => {
//             let newSkills = [...prev.skill_ids];
//             if (checked) {
//                 newSkills.push(value);
//             } else {
//                 newSkills = newSkills.filter(id => id !== value);
//             }
//             return { ...prev, skill_ids: newSkills };
//         });
//     };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     if (!formData.college_id || formData.skill_ids.length === 0) {
//         setError('Please select college and at least one skill');
//         return;
//     }

//     const payload = {
//         user_id: Number(userId),
//         college_id: Number(formData.college_id),
//         skillset: formData.skill_ids.map(Number)
//     };

//     try {
//         await axios.post('http://localhost:8081/student/register', payload);
//         setMessage('Student details registered successfully!');
//     } catch (err) {
//         setError(err.response?.data?.message || 'Failed to register student details');
//     }
// };

//     return (
//         <div style={styles.container}>
//             <h2>Student Details</h2>

//             {error && <p style={styles.error}>{error}</p>}
//             {message && <p style={styles.success}>{message}</p>}

//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <select
//                     name="college_id"
//                     value={formData.college_id}
//                     onChange={handleChange}
//                     style={styles.input}
//                 >
//                     <option value="">Select College</option>
//                     {colleges.map((college) => (
//                         <option key={college.college_id} value={college.college_id}>
//                             {college.college_Name}
//                         </option>
//                     ))}
//                 </select>

//                 <div style={{ marginBottom: '12px' }}>
//                     <label>Select Skills:</label>
//                     {skills.map((skill) => (
//                         <div key={skill.skill_id}>
//                             <input
//                                 type="checkbox"
//                                 value={skill.skill_id}
//                                 onChange={handleSkillChange}
//                                 checked={formData.skill_ids.includes(String(skill.skill_id))}
//                             />
//                             {skill.skill_name}
//                         </div>
//                     ))}
//                 </div>

//                 <button type="submit" style={styles.button}>Submit</button>
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
//         backgroundColor: '#28a745',
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

// export default StudentDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate(); // ✅ Added navigation hook

    const [colleges, setColleges] = useState([]);
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        college_id: '',
        skill_ids: [],
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/college/all')
            .then((res) => setColleges(res.data))
            .catch(() => setError('Failed to load colleges'));

        axios.get('http://localhost:8081/skillset/all')
            .then((res) => setSkills(res.data))
            .catch(() => setError('Failed to load skills'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            let newSkills = [...prev.skill_ids];
            if (checked) {
                newSkills.push(value);
            } else {
                newSkills = newSkills.filter(id => id !== value);
            }
            return { ...prev, skill_ids: newSkills };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.college_id || formData.skill_ids.length === 0) {
            setError('Please select college and at least one skill');
            return;
        }

        const payload = {
            user_id: Number(userId),
            college_id: Number(formData.college_id),
            skillset: formData.skill_ids.map(Number)
        };

        try {
            await axios.post('http://localhost:8081/student/register', payload);
            setMessage('Student details registered successfully!');
            
            // ✅ Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register student details');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Student Details</h2>

            {error && <p style={styles.error}>{error}</p>}
            {message && <p style={styles.success}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <select
                    name="college_id"
                    value={formData.college_id}
                    onChange={handleChange}
                    style={styles.input}
                >
                    <option value="">Select College</option>
                    {colleges.map((college) => (
                        <option key={college.college_id} value={college.college_id}>
                            {college.college_Name}
                        </option>
                    ))}
                </select>

                <div style={{ marginBottom: '12px' }}>
                    <label>Select Skills:</label>
                    {skills.map((skill) => (
                        <div key={skill.skill_id}>
                            <input
                                type="checkbox"
                                value={skill.skill_id}
                                onChange={handleSkillChange}
                                checked={formData.skill_ids.includes(String(skill.skill_id))}
                            />
                            {skill.skill_name}
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

export default StudentDetails;
