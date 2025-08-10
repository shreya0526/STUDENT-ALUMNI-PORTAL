import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../store/userSlice'; 

const AlumniDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [postedEvents, setPostedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userAction.clearUser());
    navigate('/');
  };

  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    email: '',
    password: '',
    phone_no: ''
  });

  const [createForm, setCreateForm] = useState({
    eventName: '',
    date: '',
    time: '',
    link: '',
    description: '',
    alumniId: user?.user_id || ''
  });

  const [editEventForm, setEditEventForm] = useState({
    eventId: 0,
    eventName: '',
    date: '',
    time: '',
    link: '',
    description: '',
    alumniId: user?.user_id || ''
  });

  const [showRegisteredStudents, setShowRegisteredStudents] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState([]);

  useEffect(() => {
    if (user?.user_id) {
      fetchProfile();
      fetchPostedEvents();
    }
  }, [user]);

  const fetchProfile = () => {
    setLoading(true);
    axios.get(`http://localhost:8080/alumni/Alumni/get-alumni-id-by-userid/${user.user_id}`)
      .then(res => {
        const alumniData = res.data.alumnus;
        setProfile(alumniData);
        setFormData({
          user_id: alumniData.userId,
          user_name: alumniData.userName,
          email: alumniData.email,
          password: alumniData.password,
          phone_no: alumniData.phoneNo
        });
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch profile');
        setLoading(false);
      });
  };

  const fetchPostedEvents = () => {
    setLoading(true);
    axios.get(`http://localhost:8080/alumni/Alumni/getevents/${user.user_id}`)
      .then(res => {
        setPostedEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch events');
        setLoading(false);
      });
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios.delete(`http://localhost:8080/alumni/api/Event/delete/${eventId}`)
        .then(() => {
          alert('Event deleted successfully');
          fetchPostedEvents();
        })
        .catch(() => alert('Failed to delete event'));
    }
  };

  const handleEditEvent = (event) => {
    setEditEventId(event.eventId);
    setEditEventForm({
      eventId: event.eventId,
      eventName: event.eventName,
      date: event.date.split('T')[0],
      time: event.time.length === 5 ? event.time + ":00" : event.time,
      link: event.link,
      description: event.description,
      alumniId: user.user_id
    });
  };

  const handleUpdateEventChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Auto-format time on edit
    if (name === "time" && value.length === 5) {
      newValue = value + ":00";
    }

    setEditEventForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleUpdateEventSubmit = (e) => {
    e.preventDefault();

    let formattedTime = editEventForm.time;
    if (formattedTime && formattedTime.length === 5) {
      formattedTime += ":00";
    }

    const updatedEvent = { ...editEventForm, time: formattedTime };

    axios.put(`http://localhost:8080/alumni/api/Event/update/${editEventForm.eventId}`, updatedEvent)
      .then(() => {
        alert('Event updated successfully');
        setEditEventId(null);
        fetchPostedEvents();
      })
      .catch(() => alert('Failed to update event'));
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'dashboard') fetchProfile();
    else if (section === 'postedEvents') fetchPostedEvents();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
  e.preventDefault();

  const updatedData = {
    alumniId: profile?.userId, // From fetched profile
    userName: formData.user_name,
    password: formData.password,
    email: formData.email,
    phoneNo: formData.phone_no,
    sectorId: profile?.sectorId || 0, // Keep same or update later
    workId: profile?.workId || 0      // Keep same or update later
  };
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
  axios.put(`http://localhost:8080/alumni/Alumni/update`, updatedData)
    .then(() => {
      alert('Profile updated');
      setEditMode(false);
      fetchProfile();
    })
    .catch(() => alert('Update failed'));
};

  const handleCreateEventChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Auto-format time on create
    if (name === "time" && value.length === 5) {
      newValue = value + ":00";
    }

    setCreateForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();

    let formattedTime = createForm.time;
    if (formattedTime && formattedTime.length === 5) {
      formattedTime += ":00";
    }

    let obj = { 
      ...createForm, 
      alumniId: user.user_id,
      time: formattedTime 
    };

    console.log(JSON.stringify(obj));

    fetch("http://localhost:8080/alumni/api/Event", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then(() => {
        alert("Event saved");
        fetchPostedEvents();
        setActiveSection('postedEvents');
      })
      .catch(() => alert("Event not saved"));
  };

  const fetchRegisteredStudents = (eventId) => {
    axios.get(`http://localhost:8080/alumni/api/Event/registered-student-names/${eventId}`)
      .then(res => {
        setRegisteredStudents(res.data);
        setShowRegisteredStudents(true);
      })
      .catch(() => {
        alert("Failed to fetch registered students");
        setShowRegisteredStudents(false);
      });
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#FFFDD0' }}> {/* Cream background */}
      {/* Sidebar */}
      <div className="text-white p-3" style={{ width: '250px', backgroundColor: '#800080' }}> {/* Purple sidebar */}
        <h4>Alumni Portal</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('dashboard')} style={{ color: activeSection === 'dashboard' ? '#FFC0CB' : 'white' }}>Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('postedEvents')} style={{ color: activeSection === 'postedEvents' ? '#FFC0CB' : 'white' }}>Posted Events</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('createEvent')} style={{ color: activeSection === 'createEvent' ? '#FFC0CB' : 'white' }}>Create Event</button>
          </li>
          <li className="nav-item mt-4">
            <button className="btn w-100" onClick={handleLogout} style={{ backgroundColor: '#FF69B4', color: 'white', border: 'none' }}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 style={{ color: '#800080' }}>Welcome Alumni, {user?.user_name} 👋</h2>
        <p style={{ color: '#800080' }}>Email: <strong>{user?.email}</strong></p>
        <hr style={{ borderColor: '#FFC0CB' }} />

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div>
            <h5 style={{ color: '#800080' }}>Alumni Profile</h5>
            {loading ? (
              <p style={{ color: '#800080' }}>Loading profile...</p>
            ) : profile ? (
              <div className="card shadow mx-auto" style={{ maxWidth: '500px', backgroundColor: '#FFFDD0', boxShadow: '0 4px 8px rgba(255, 192, 203, 0.3)' }}>
                <div className="card-body">
                  {editMode ? (
                    <form onSubmit={handleUpdateSubmit}>
                      <input type="text" name="user_name" className="form-control mb-2" value={formData.user_name} onChange={handleInputChange} placeholder="Name" style={{ borderColor: '#FFC0CB' }} />
                      <input type="email" name="email" className="form-control mb-2" value={formData.email} onChange={handleInputChange} placeholder="Email" style={{ borderColor: '#FFC0CB' }} />
                      <input type="password" name="password" className="form-control mb-2" value={formData.password} onChange={handleInputChange} placeholder="Password" style={{ borderColor: '#FFC0CB' }} />
                      <input type="text" name="phone_no" className="form-control mb-2" value={formData.phone_no} onChange={handleInputChange} placeholder="Phone" style={{ borderColor: '#FFC0CB' }} />
                      <button type="submit" className="btn" style={{ backgroundColor: '#800080', color: 'white', border: 'none' }}>Save</button>
                      <button type="button" className="btn ms-2" onClick={() => setEditMode(false)} style={{ backgroundColor: '#FFC0CB', color: '#4B0082', border: 'none' }}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <h4 style={{ color: '#800080' }}>{profile.userName}</h4>
                      <p style={{ color: '#4B0082' }}><strong>Email:</strong> {profile.email}</p>
                      <p style={{ color: '#4B0082' }}><strong>Phone:</strong> {profile.phoneNo}</p>
                      <button className="btn mt-2" onClick={() => setEditMode(true)} style={{ backgroundColor: '#FF69B4', color: 'white', border: 'none' }}>Edit Profile</button>
                    </>
                  )}
                </div>
              </div>
            ) : <p style={{ color: '#800080' }}>No profile found</p>}
          </div>
        )}

        {/* Posted Events */}
        {activeSection === 'postedEvents' && (
          <div>
            <h5 style={{ color: '#800080' }}>Your Posted Events</h5>
            {loading ? (
              <p style={{ color: '#800080' }}>Loading events...</p>
            ) : postedEvents.length === 0 ? (
              <p style={{ color: '#800080' }}>No events found.</p>
            ) : (
              <table className="table table-bordered mt-3" style={{ borderColor: '#FFC0CB' }}>
                <thead style={{ backgroundColor: '#FFC0CB', color: '#4B0082' }}>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Link</th>
                    <th>Description</th>
                    <th>Actions</th>
                    <th>Registered Students</th>
                  </tr>
                </thead>
                <tbody>
                  {postedEvents.map((event, index) => (
                    <React.Fragment key={event.eventId}>
                      <tr style={{ backgroundColor: index % 2 === 0 ? '#FFFDD0' : '#FFFAFA', color: '#4B0082' }}>
                        <td>{event.eventName}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.time}</td>
                        <td><a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: '#800080' }}>Join</a></td>
                        <td>{event.description}</td>
                        <td>
                          <button className="btn btn-sm me-2" onClick={() => handleEditEvent(event)} style={{ backgroundColor: '#FF69B4', color: 'white', border: 'none' }}>Update</button>
                          <button className="btn btn-sm" onClick={() => handleDeleteEvent(event.eventId)} style={{ backgroundColor: '#4B0082', color: 'white', border: 'none' }}>Delete</button>
                        </td>
                        <td>
                          <button className="btn btn-sm" onClick={() => fetchRegisteredStudents(event.eventId)} style={{ backgroundColor: '#FFC0CB', color: '#4B0082', border: 'none' }}>View</button>
                        </td>
                      </tr>
                      {editEventId === event.eventId && (
                        <tr>
                          <td colSpan="7">
                            <form onSubmit={handleUpdateEventSubmit}>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <input type="text" name="eventName" value={editEventForm.eventName} onChange={handleUpdateEventChange} className="form-control" required style={{ borderColor: '#FFC0CB' }} />
                                </div>
                                <div className="col-md-2">
                                  <input type="date" name="date" value={editEventForm.date} onChange={handleUpdateEventChange} className="form-control" required style={{ borderColor: '#FFC0CB' }} />
                                </div>
                                <div className="col-md-2">
                                  <input type="time" name="time" value={editEventForm.time} onChange={handleUpdateEventChange} className="form-control" required style={{ borderColor: '#FFC0CB' }} />
                                </div>
                                <div className="col-md-4">
                                  <input type="text" name="link" value={editEventForm.link} onChange={handleUpdateEventChange} className="form-control" placeholder="Link" style={{ borderColor: '#FFC0CB' }} />
                                </div>
                                <div className="col-md-12 mt-2">
                                  <textarea name="description" value={editEventForm.description} onChange={handleUpdateEventChange} className="form-control" placeholder="Description" style={{ borderColor: '#FFC0CB' }} />
                                </div>
                                <div className="col-md-12 mt-2 text-end">
                                  <button type="submit" className="btn btn-sm me-2" style={{ backgroundColor: '#800080', color: 'white', border: 'none' }}>Save</button>
                                  <button type="button" className="btn btn-sm" onClick={() => setEditEventId(null)} style={{ backgroundColor: '#FFC0CB', color: '#4B0082', border: 'none' }}>Cancel</button>
                                </div>
                              </div>
                            </form>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}

            {/* Registered Students Section */}
            {showRegisteredStudents && (
              <div className="card mt-3" style={{ maxWidth: '500px', backgroundColor: '#FFFDD0', boxShadow: '0 4px 8px rgba(255, 192, 203, 0.3)' }}>
                <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#FFC0CB', color: '#4B0082' }}>
                  <strong>Registered Students</strong>
                  <button className="btn-close" onClick={() => setShowRegisteredStudents(false)} style={{ color: '#4B0082' }}></button>
                </div>
                <div className="card-body" style={{ color: '#4B0082' }}>
                  {registeredStudents.length === 0 ? (
                    <p>No students registered for this event.</p>
                  ) : (
                    <ul className="list-group">
                      {registeredStudents.map((name, idx) => (
                        <li key={idx} className="list-group-item" style={{ backgroundColor: '#FFFDD0', borderColor: '#FFC0CB' }}>{name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Event */}
        {activeSection === 'createEvent' && (
          <div style={{ maxWidth: '600px' }}>
            <h5 style={{ color: '#800080' }}>Create New Event</h5>
            <form onSubmit={handleCreateEventSubmit}>
              <input type="text" name="eventName" value={createForm.eventName} onChange={handleCreateEventChange} className="form-control mb-2" placeholder="Event Name" required style={{ borderColor: '#FFC0CB' }} />
              <input type="date" name="date" value={createForm.date} onChange={handleCreateEventChange} className="form-control mb-2" required style={{ borderColor: '#FFC0CB' }} />
              <input type="time" name="time" value={createForm.time} onChange={handleCreateEventChange} className="form-control mb-2" required style={{ borderColor: '#FFC0CB' }} />
              <input type="text" name="link" value={createForm.link} onChange={handleCreateEventChange} className="form-control mb-2" placeholder="Meeting Link" style={{ borderColor: '#FFC0CB' }} />
              <textarea name="description" value={createForm.description} onChange={handleCreateEventChange} className="form-control mb-2" placeholder="Event Description" required style={{ borderColor: '#FFC0CB' }} />
              <button type="submit" className="btn" style={{ backgroundColor: '#800080', color: 'white', border: 'none' }}>Create Event</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDashboard;
