import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AdminProfile from './AdminProfile';
import StudentTable from './StudentTable';
import AlumniTable from './AluminiTable';
import EventTable from './EventTable';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.user_id) fetchAdminProfile();
  }, [user]);

  const fetchAdminProfile = () => {
    axios.get(`http://localhost:8082/user/getone?user_id=${user.user_id}`)
      .then((res) => setAdminProfile(res.data))
      .catch(() => alert('Failed to fetch admin profile'));
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'manageStudents') fetchStudents();
    else if (section === 'manageEvents') fetchEvents();
    else if (section === 'manageAlumni') fetchAlumni();
    else if (section === 'dashboard') fetchAdminProfile();
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
      <AdminSidebar onSectionChange={handleSectionChange} />
      <div className="flex-grow-1 p-4">
        <h2>Welcome Admin, {user?.user_name} 👋</h2>
        <p>Your email: <strong>{user?.email}</strong></p>
        <hr />

        {activeSection === 'dashboard' && <AdminProfile profile={adminProfile} />}
        {activeSection === 'manageStudents' && <StudentTable students={students} loading={loading} />}
        {activeSection === 'manageAlumni' && <AlumniTable alumni={alumni} loading={loading} />}
        {activeSection === 'manageEvents' && <EventTable events={events} loading={loading} />}
        {activeSection === 'settings' && <p>Admin settings and preferences.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
