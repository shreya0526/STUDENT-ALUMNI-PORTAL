import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AlumniSidebar from './AluminiSidebar';
import AluminiRegisteredEvents from './AluminiRegisteredEvents';
import AlumniProfile from './AlumniProfile';
import CreateEventForm from './AlumniCreateEventForm';



const AlumniDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');

  const [profile, setProfile] = useState(null);
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [alumniId, setAlumniId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    if (user?.user_id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = () => {
    axios
      .get(`http://localhost:8082/user/getone?user_id=${user.user_id}`)
      .then((res) => setProfile(res.data))
      .catch(() => alert("Failed to fetch profile"));
  };

  const fetchRegisteredEvent = () => {
    setLoading(true);
    axios
      .get(`https://localhost:7137/api/Alumni/alumni/${user.user_id}`)
      .then((res) => {
        const eventData = res.data;

        // ✅ Extract alumniId from response
        setAlumniId(eventData.alumniId);

        // ✅ Store event data
        setRegisteredEvent(eventData);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch registered event");
        setLoading(false);
      });
  };

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8082/post/user/${user.user_id}`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch posts");
        setLoading(false);
      });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'registeredEvents') fetchRegisteredEvent();
    else if (section === 'posts') fetchPosts();
    else if (section === 'dashboard') fetchProfile();
     else if (section === 'createevent') fetchc();
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <AlumniSidebar onSectionChange={handleSectionChange} />

      <div className="flex-grow-1 p-4">
        <h2>Welcome Alumni, {user?.user_name} 👋</h2>
        <p>Email: <strong>{user?.email}</strong></p>
        <hr />

        {activeSection === 'dashboard' && <AlumniProfile profile={profile} />}
        {activeSection === 'registeredEvents' && (
          <AluminiRegisteredEvents event={registeredEvent} loading={loading} />
        )}
        {activeSection === 'reateevent' && (
          <crea event={registeredEvent} loading={loading} />
        )}
        {/* {activeSection === 'posts' && <Posts posts={posts} loading={loading} />}
        {activeSection === 'settings' && <Settings />} */}

        {alumniId && (
          <div className="mt-4 text-muted">
            <small>Alumni ID: {alumniId}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDashboard;
