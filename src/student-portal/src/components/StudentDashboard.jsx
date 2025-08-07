import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StudentSidebar from './StudentSidebar';
import StudentProfileCard from './StudentProfileCard';
import StudentEventList from './StudentEventList';
import StudentRegisteredEvents from './StudentRegisteredEvents';


const StudentDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [events, setEvents] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    email: '',
    password: '',
    phone_no: ''
  });

  useEffect(() => {
    if (user?.user_id) {
      fetchStudentProfile();
      fetchRegisteredEvents();
    }
  }, [user]);

  const fetchStudentProfile = () => {
    setLoading(true);
    axios.get(`http://localhost:8081/student/getone?student_id=${user.user_id}`)
      .then((res) => {
        setStudentProfile(res.data);
        setFormData({
          user_id: res.data.user.user_id,
          user_name: res.data.user.user_name,
          email: res.data.user.email,
          password: res.data.user.password,
          phone_no: res.data.user.phone_no
        });
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch student profile');
        setLoading(false);
      });
  };

  const fetchEvents = () => {
    setLoading(true);
    axios.get('http://localhost:8081/event/all')
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch events');
        setLoading(false);
      });
  };

  const fetchRegisteredEvents = () => {
    setLoading(true);
    axios.get(`http://localhost:8081/registerevent/registeredevents?student_id=${user.user_id}`)
      .then((res) => {
        setRegisteredEvents(res.data);
        const registeredEventIds = res.data.map(item => item.event.event_id);
        setJoinedEvents(registeredEventIds);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch registered events');
        setLoading(false);
      });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'events') {
      fetchEvents();
    } else if (section === 'registeredEvents') {
      fetchRegisteredEvents();
    } else if (section === 'dashboard') {
      fetchStudentProfile();
    }
  };

  const handleJoinEvent = (eventId) => {
    const payload = {
      student_id: studentProfile.student_id,
      event_id: eventId
    };

    axios.post('http://localhost:8081/registerevent/save', payload)
      .then(() => {
        alert('Successfully joined event');
        setJoinedEvents((prev) => [...prev, eventId]);
      })
      .catch(() => alert('Failed to join event'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/student/update', formData)
      .then(() => {
        alert('Profile updated successfully');
        setEditMode(false);
        fetchStudentProfile();
      })
      .catch(() => alert('Failed to update profile'));
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <StudentSidebar handleSectionChange={handleSectionChange} />
      <div className="flex-grow-1 p-4">
        <h2>Welcome Student, {user?.user_name} 👋</h2>
        <p>Your email: <strong>{user?.email}</strong></p>
        <hr />

        {activeSection === 'dashboard' && (
          <StudentProfileCard
            studentProfile={studentProfile}
            editMode={editMode}
            formData={formData}
            handleInputChange={handleInputChange}
            handleUpdateSubmit={handleUpdateSubmit}
            setEditMode={setEditMode}
            loading={loading}
          />
        )}

        {activeSection === 'events' && (
          <StudentEventList
            events={events}
            joinedEvents={joinedEvents}
            handleJoinEvent={handleJoinEvent}
            loading={loading}
          />
        )}

        {activeSection === 'registeredEvents' && (
          <StudentRegisteredEvents
            registeredEvents={registeredEvents}
            loading={loading}
          />
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;