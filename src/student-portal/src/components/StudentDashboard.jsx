import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentSidebar from './StudentSidebar';
import StudentProfileCard from './StudentProfileCard';
import StudentEventList from './StudentEventList';
import StudentRegisteredEvents from './StudentRegisteredEvents';

const StudentDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();

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

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.user_id) {
      fetchStudentProfile();
    }
  }, [user]);

  useEffect(() => {
    if (studentProfile?.student_id) {
      fetchRegisteredEvents(studentProfile.student_id);
    }
  }, [studentProfile]);

  const fetchStudentProfile = () => {
    setLoading(true);

    axios.get(`http://localhost:8080/student/student/userid/${user.user_id}`)
      .then(res => {

    
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

    axios.get(`http://localhost:8080/student/event/all`)
      .then((res) => {

        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch events');
        setLoading(false);
      });
  };

  const fetchRegisteredEvents = (studentId) => {
    setLoading(true);

    axios.get(`http://localhost:8080/student/registerevent/registeredevents?student_id=${studentId}`)
      .then(res => {

    

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
      if (studentProfile?.student_id) {
        fetchRegisteredEvents(studentProfile.student_id);
      }
    } else if (section === 'dashboard') {
      fetchStudentProfile();
    }
  };

  const handleJoinEvent = (eventId) => {
    if (!studentProfile?.student_id) return;
    const payload = {
      student_id: studentProfile.student_id,
      event_id: eventId
    };

    axios.post('http://localhost:8080/student/registerevent/save', payload)
      .then(() => {
        alert('Successfully joined event');
        setJoinedEvents(prev => [...prev, eventId]);
      })
      .catch(() => alert('Failed to join event'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
      if (!formData.user_name.trim()) {
    alert("Name is required");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.email)) {
    alert("Please enter a valid email");
    return;
  }

  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(formData.phone_no)) {
    alert("Phone number must be 10 digits");
    return;
  }
    axios.post('http://localhost:8080/student/student/update', formData)
      .then(() => {
        alert('Profile updated successfully');
        setEditMode(false);
        fetchStudentProfile();
      })
      .catch(() => alert('Failed to update profile'));
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#FFFDD0' }}> {/* Cream background */}
      <StudentSidebar handleSectionChange={handleSectionChange} />
      <div className="flex-grow-1 p-4">
        <h2 style={{ color: '#800080' }}>Welcome Student, {user?.user_name} 👋</h2>
        <p style={{ color: '#800080' }}>Your email: <strong>{user?.email}</strong></p>
        <hr style={{ borderColor: '#FFC0CB' }} />

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
