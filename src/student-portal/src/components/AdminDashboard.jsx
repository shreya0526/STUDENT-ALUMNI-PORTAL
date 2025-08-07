import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdminDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    } else if (section === 'dashboard') {
      fetchAdminProfile();
    }
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
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('settings')}>Settings</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Welcome Admin, {user?.user_name} 👋</h2>
        <p>Your email: <strong>{user?.email}</strong></p>
        <hr />

        {/* Dashboard Profile Overview */}
        {activeSection === 'dashboard' && (
          <div>
            <h5>Admin Profile Overview</h5>
            {adminProfile ? (
              <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body text-center">
                  
                  <h4>{adminProfile.user_name}</h4>
                  <p className="text-muted">Admin ID: {adminProfile.user_id}</p>
                  <div className="text-start">
                    <p><strong>Email:</strong> {adminProfile.email}</p>
                    <p><strong>Phone:</strong> {adminProfile.phone_no}</p>
                    <p><strong>City:</strong> {adminProfile.city.city_name}</p>
                    <p><strong>Role ID:</strong> <span className="badge bg-primary">{adminProfile.role_id}</span></p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        )}

        {/* Manage Students */}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Manage Alumni */}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Manage Events */}
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
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.time}</td>
                      <td>
                        <a href={event.link} target="_blank" rel="noopener noreferrer">
                          {event.link}
                        </a>
                      </td>
                      <td>{event.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Settings */}
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
