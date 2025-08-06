import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const StudentDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [events, setEvents] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);

    if (section === 'events') {
      axios.get('http://localhost:8081/event/all')
        .then((res) => setEvents(res.data))
        .catch((err) => console.error('Failed to fetch events', err));
    } else if (section === 'dashboard') {
      axios.get(`http://localhost:8081/student/getone?student_id=${user.user_id}`)
        .then((res) => setStudentDetails(res.data))
        .catch((err) => console.error('Failed to fetch student details', err));
    }
  };

  useEffect(() => {
    // Initial fetch for dashboard
    axios.get(`http://localhost:8081/student/getone?student_id=${user.user_id}`)
      .then((res) => setStudentDetails(res.data))
      .catch((err) => console.error('Failed to fetch student details', err));
  }, [user.user_id]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Student Portal</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="nav-link text-white btn btn-link" onClick={() => handleSectionClick('dashboard')}>
              Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link text-white btn btn-link" onClick={() => handleSectionClick('events')}>
              View Events
            </button>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Opportunities</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {activeSection === 'dashboard' && (
          <>
            <h2>Welcome Student, {user?.user_name} 👋</h2>
            <p>Your email: <strong>{user?.email}</strong></p>
            <hr />
            {studentDetails ? (
              <div>
                <h5>Student Details</h5>
                <p><strong>Student ID:</strong> {studentDetails.student_id}</p>
                <p><strong>College:</strong> {studentDetails.college.college_Name}</p>
                <p><strong>City:</strong> {studentDetails.college.city.city_name}</p>
              </div>
            ) : (
              <p>Loading student details...</p>
            )}
          </>
        )}

        {activeSection === 'events' && (
          <>
            <h2>Upcoming Events</h2>
            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <div className="list-group">
                {events.map(event => (
                  <div key={event.event_id} className="list-group-item mb-3" style={{ backgroundColor: '#e6ffe6', borderLeft: '5px solid #28a745' }}>
                    <h5>{event.event_name}</h5>
                    <p>{event.description}</p>
                    <p>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}<br />
                      <strong>Time:</strong> {event.time}
                    </p>
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">
                      Join Event
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;