
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/userSlice';

const AdminDashboard = () => {
  
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);
const [showCollegeForm, setShowCollegeForm] = useState(false);
const [newCollege, setNewCollege] = useState({ college_name: '', city_id: '' });
const [cities, setCities] = useState([]);
const navigate = useNavigate();
const dispatch = useDispatch();
const [registeredStudents, setRegisteredStudents] = useState([]);
const [selectedEventId, setSelectedEventId] = useState('');


const handleLogout = () => {
  console.log("Logout clicked");
  dispatch(userAction.clearUser());   // clear from Redux
  localStorage.removeItem('user');    // clear from storage
  navigate('/');                      // redirect to login/home
};



const handleCollegeInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollege((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCollege = () => {
    if (!newCollege.college_name || !newCollege.city_id) {
      alert('Please fill in all fields');
      return;
    }

    axios.post('http://localhost:8082/college/save', newCollege)
      .then(() => {
        alert('College added successfully');
        setShowCollegeForm(false);
        setNewCollege({ college_name: '', city_id: '' });
        fetchColleges(); // refresh table
      })
      .catch(() => alert('Failed to add college'));
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchAdminProfile();
    }
  }, [user]);

  const fetchAdminProfile = () => {
    axios.get(`http://localhost:8082/user/getone?user_id=${user.user_id}`)
      .then((res) => setAdminProfile(res.data))
      .catch(() => alert('Failed to fetch admin profile'));
  };

 const handleSectionChange = (section) => {
  setActiveSection(section);

  if (section === 'manageStudents') {
    fetchStudents();
  } else if (section === 'manageEvents') {
    fetchEvents();
  } else if (section === 'manageAlumni') {
    fetchAlumni();
  } else if (section === 'manageColleges') {
    fetchColleges();
    fetchCities();
  } else if (section === 'registeredStudents') {
    fetchEvents(); // Load event list for the dropdown
    setRegisteredStudents([]); // Clear previous data
  } else if (section === 'dashboard') {
    fetchAdminProfile();
  }
};


const fetchRegisteredStudents = (eventId) => {
  axios.get(`http://localhost:8082/registerevent/registerstudent/${eventId}`)
    .then((res) => setRegisteredStudents(res.data))
    .catch(() => alert('Failed to fetch registered students'));
};


  const fetchStudents = () => {
    setLoading(true);
    axios.get('http://localhost:8082/student/all')
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch students');
        setLoading(false);
      });
  };

  const fetchEvents = () => {
    setLoading(true);
    axios.get('http://localhost:8082/event/all')
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch events');
        setLoading(false);
      });
  };

  const fetchAlumni = () => {
    setLoading(true);
    axios.get('http://localhost:8082/alumni/all')
      .then((res) => {
        setAlumni(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch alumni');
        setLoading(false);
      });
  };

  const fetchColleges = () => {
  axios.get('http://localhost:8082/college/all')
    .then(response => {
      setColleges(response.data);
    })
    .catch(error => {
      console.error('Error fetching colleges:', error);
    });
};
const fetchCities = () => {
  axios.get('http://localhost:8082/city/all')
    .then((res) => setCities(res.data))
    .catch(() => alert('Failed to fetch cities'));
};


  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`http://localhost:8082/student/delete/${studentId}`)
        .then(() => {
          alert('Student deleted successfully');
          fetchStudents(); // Refresh the student list
        })
        .catch(() => {
          alert('Failed to delete student');
        });
    }
  };
const handleDeleteAlumni = (alumniId) => {
  if (window.confirm('Are you sure you want to delete this alumni?')) {
    axios.delete(`http://localhost:8082/alumni/delete/${alumniId}`)
      .then(() => {
        alert('Alumni deleted successfully');
        fetchAlumni(); // Refresh the alumni list
      })
      .catch(() => {
        alert('Failed to delete alumni');
      });
  }
};
const handleDeleteEvent = (eventId) => {
  if (window.confirm('Are you sure you want to delete this event?')) {
    axios.delete(`http://localhost:8082/event/delete/${eventId}`)
      .then(() => {
        alert('Event deleted successfully');
        fetchEvents(); // Refresh event list
      })
      .catch(() => {
        alert('Failed to delete event');
      });
  }
};


  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('manageStudents')}>Manage Students</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('manageAlumni')}>Manage Alumni</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('manageEvents')}>Manage Events</button>
          </li>
          <li className="nav-item mb-2">
  <button className="btn btn-link text-white" onClick={() => handleSectionChange('manageColleges')}>Manage Colleges</button>
</li>
<li className="nav-item mb-2">
  <button className="btn btn-link text-white" onClick={() => handleSectionChange('registeredStudents')}>
    Registered Students
  </button>
</li>

          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('settings')}>Settings</button>
          </li>

          <li className="nav-item mt-4">
    <button className="btn btn-danger w-100" onClick={handleLogout}>
      Logout
    </button>
  </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Welcome Admin, {user?.user_name} 👋</h2>
        <p>Your email: <strong>{user?.email}</strong></p>
        <hr />

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div>
            <h5>Admin Profile Overview</h5>
            {adminProfile ? (
              <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body text-center">
                  <h4>{adminProfile.user_name}</h4>
                 
                  <div className="text-start">
                    <p><strong>Email:</strong> {adminProfile.email}</p>
                    <p><strong>Phone:</strong> {adminProfile.phone_no}</p>
                    <p><strong>City:</strong> {adminProfile.city.city_name}</p>
                    
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        )}

        {/* Manage Students Section */}
        {activeSection === 'manageStudents' && (
          <div>
            <h5>Manage Students</h5>
            {loading ? (
              <p>Loading students...</p>
            ) : (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>College</th>
                    <th>Skills</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.student_id}</td>
                      <td>{student.user.user_name}</td>
                      <td>{student.user.email}</td>
                      <td>{student.user.phone_no}</td>
                      <td>{student.user.city.city_name}</td>
                      <td>{student.college.college_name}</td>
                      <td>
                        {student.studentskillset
                          .map((skillSet) => skillSet.skillset.skill_name)
                          .join(', ')}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteStudent(student.student_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Manage Alumni Section */}
        {activeSection === 'manageAlumni' && (
          <div>
            <h5>Manage Alumni</h5>
            {loading ? (
              <p>Loading alumni...</p>
            ) : (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Alumni ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Sector</th>
                    <th>Work Title</th>
                  </tr>
                </thead>
                <tbody>
  {alumni.map((alum) => (
    <tr key={alum.alumni_id}>
      <td>{alum.alumni_id}</td>
      <td>{alum.user.user_name}</td>
      <td>{alum.user.email}</td>
      <td>{alum.user.phone_no}</td>
      <td>{alum.user.city.city_name}</td>
      <td>{alum.sector.sector_name}</td>
      <td>{alum.worktitle.work_name}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteAlumni(alum.alumni_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            )}
          </div>
        )}

        {/* Manage Events Section */}
        {activeSection === 'manageEvents' && (
          <div>
            <h5>Manage Events</h5>
            {loading ? (
              <p>Loading events...</p>
            ) : (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Event ID</th>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Link</th>
                    <th>Description</th>
                  </tr>
                </thead>
               <tbody>
        {events.map((event) => (
          <tr key={event.event_id}>
            <td>{event.event_id}</td>
            <td>{event.event_name}</td>
            <td>{event.date}</td>
            <td>{event.time}</td>
            <td>{event.link}</td>
            <td>{event.description}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteEvent(event.event_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
              </table>
            )}
          </div>
        )}

{/* Manage Colleges Section */}
{activeSection === 'manageColleges' && (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5>Manage Colleges</h5>
      <button
        className="btn btn-primary"
        onClick={() => setShowCollegeForm(!showCollegeForm)}
      >
        {showCollegeForm ? 'Cancel' : 'Add College'}
      </button>
    </div>

    {showCollegeForm && (
      <div className="card p-3 mb-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">College Name</label>
          <input
            type="text"
            className="form-control"
            name="college_name"
            value={newCollege.college_name}
            onChange={handleCollegeInputChange}
            placeholder="Enter college name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select City</label>
          <select
            className="form-select"
            name="city_id"
            value={newCollege.city_id}
            onChange={handleCollegeInputChange}
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success" onClick={handleAddCollege}>
          Submit
        </button>
      </div>
    )}

    {loading ? (
      <p>Loading colleges...</p>
    ) : (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>College ID</th>
            <th>College Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => (
            <tr key={college.college_id}>
              <td>{college.college_id}</td>
              <td>{college.college_name}</td>
              <td>{college.city?.city_name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}


{activeSection === 'registeredStudents' && (
  <div>
    <h5>View Registered Students for an Event</h5>

    <div className="mb-3">
      <label className="form-label">Select Event</label>
      <select
        className="form-select"
        value={selectedEventId}
        onChange={(e) => {
          const eventId = e.target.value;
          setSelectedEventId(eventId);
          if (eventId) {
            fetchRegisteredStudents(eventId);
          } else {
            setRegisteredStudents([]);
          }
        }}
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event.event_id} value={event.event_id}>
            {event.event_name}
          </option>
        ))}
      </select>
    </div>

    {selectedEventId && (
      <div>
        {registeredStudents.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
              </tr>
            </thead>
            <tbody>
              {registeredStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.user?.user_name}</td>
                  <td>{student.user?.email}</td>
                  <td>{student.user?.phone_no}</td>
                  <td>{student.college?.college_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students registered for this event.</p>
        )}
      </div>
    )}
  </div>
)}


        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div>
            <h5>Settings</h5>
            <p>Admin settings and preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
