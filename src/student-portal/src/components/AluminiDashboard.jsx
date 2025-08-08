import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AlumniDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [activeSection, setActiveSection] = useState('dashboard');

  const [profile, setProfile] = useState(null);
  const [postedEvents, setPostedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null); // currently editing event

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

  useEffect(() => {
    if (user?.user_id) {
      fetchProfile();
      fetchPostedEvents();
    }
  }, [user]);

  const fetchProfile = () => {
    setLoading(true);
    axios.get(`http://localhost:5037/Alumni/get-alumni-id-by-userid/${user.user_id}`)
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
    axios.get(`http://localhost:5037/Alumni/getevents/${user.user_id}`)
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
      axios.delete(`http://localhost:5037/api/Event/delete/${eventId}`)
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
      time: event.time,
      link: event.link,
      description: event.description,
      alumniId: user.user_id
    });
    
  };

  const handleUpdateEventChange = (e) => {
    const { name, value } = e.target;
    setEditEventForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateEventSubmit = (e) => {
    e.preventDefault();
    console.log(editEventForm);
    axios.put(`http://localhost:5037/api/Event/update/${editEventForm.eventId}`, editEventForm)
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
    axios.put(`http://localhost:5037/Alumni/update`, formData)
      .then(() => {
        alert('Profile updated');
        setEditMode(false);
        fetchProfile();
      })
      .catch(() => alert('Update failed'));
  };

  const handleCreateEventChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
   let obj = {...createForm,
    alumniId: user.user_id}
console.log(obj)
  // fetch("http://localhost:5037/api/Event",{
  //   method:"POST",
  //   headers:{"Content-type":"application/json"},
  //   body:JSON.stringify(obj)
  // }).then(alert("Event saved")).catch(alert("Event not saved"))

    axios.post(`http://localhost:5037/api/Event`, {
      ...createForm,
      alumniId: user.user_id
    })
      .then(() => {
        alert('Event created');
        setCreateForm({
          eventName: '',
          date: '',
          time: '',
          link: '',
          description: '',
          alumniId: user.user_id
        });
        fetchPostedEvents();
        setActiveSection('postedEvents');
      })
      .catch(() => alert('Failed to create event'));
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
        <h4>Alumni Portal</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('postedEvents')}>Posted Events</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => handleSectionChange('createEvent')}>Create Event</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Welcome Alumni, {user?.user_name} 👋</h2>
        <p>Email: <strong>{user?.email}</strong></p>
        <hr />

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div>
            <h5>Alumni Profile</h5>
            {loading ? (
              <p>Loading profile...</p>
            ) : profile ? (
              <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body text-center">
                  {editMode ? (
                    <form onSubmit={handleUpdateSubmit}>
                      <input type="text" name="user_name" className="form-control mb-2" value={formData.user_name} onChange={handleInputChange} placeholder="Name" />
                      <input type="email" name="email" className="form-control mb-2" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                      <input type="password" name="password" className="form-control mb-2" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                      <input type="text" name="phone_no" className="form-control mb-2" value={formData.phone_no} onChange={handleInputChange} placeholder="Phone" />
                      <button type="submit" className="btn btn-success">Save</button>
                      <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <h4>{profile.userName}</h4>
                      <p><strong>Email:</strong> {profile.email}</p>
                      <p><strong>Phone:</strong> {profile.phoneNo}</p>
                      <button className="btn btn-primary mt-2" onClick={() => setEditMode(true)}>Edit Profile</button>
                    </>
                  )}
                </div>
              </div>
            ) : <p>No profile found</p>}
          </div>
        )}

        {/* Posted Events */}
        {activeSection === 'postedEvents' && (
          <div>
            <h5>Your Posted Events</h5>
            {loading ? (
              <p>Loading events...</p>
            ) : postedEvents.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Link</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {postedEvents.map(event => (
                    <React.Fragment key={event.eventId}>
                      <tr>
                        <td>{event.eventName}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.time}</td>
                        <td><a href={event.link} target="_blank" rel="noopener noreferrer">Join</a></td>
                        <td>{event.description}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditEvent(event)}>Update</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(event.eventId)}>Delete</button>
                        </td>
                      </tr>
                      {editEventId === event.eventId && (
                        <tr>
                          <td colSpan="6">
                            <form onSubmit={handleUpdateEventSubmit}>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <input type="text" name="eventName" value={editEventForm.eventName} onChange={handleUpdateEventChange} className="form-control" required />
                                </div>
                                <div className="col-md-2">
                                  <input type="date" name="date" value={editEventForm.date} onChange={handleUpdateEventChange} className="form-control" required />
                                </div>
                                <div className="col-md-2">
                                  <input type="time" name="time" value={editEventForm.time} onChange={handleUpdateEventChange} className="form-control" required />
                                </div>
                                <div className="col-md-4">
                                  <input type="text" name="link" value={editEventForm.link} onChange={handleUpdateEventChange} className="form-control" placeholder="Link" />
                                </div>
                                <div className="col-md-12 mt-2">
                                  <textarea name="description" value={editEventForm.description} onChange={handleUpdateEventChange} className="form-control" placeholder="Description" />
                                </div>
                                <div className="col-md-12 mt-2 text-end">
                                  <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditEventId(null)}>Cancel</button>
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
          </div>
        )}

        {/* Create Event */}
        {activeSection === 'createEvent' && (
          <div style={{ maxWidth: '600px' }}>
            <h5>Create New Event</h5>
            <form onSubmit={handleCreateEventSubmit}>
              <input type="text" name="eventName" value={createForm.eventName} onChange={handleCreateEventChange} className="form-control mb-2" placeholder="Event Name" required />
              <input type="date" name="date" value={createForm.date} onChange={handleCreateEventChange} className="form-control mb-2" required />
              <input type="time" name="time" value={createForm.time} onChange={handleCreateEventChange} className="form-control mb-2" required />
              <input type="text" name="link" value={createForm.link} onChange={handleCreateEventChange} className="form-control mb-2" placeholder="Meeting Link" />
              <textarea name="description" value={createForm.description} onChange={handleCreateEventChange} className="form-control mb-2" placeholder="Event Description" required />
              <button type="submit" className="btn btn-success">Create Event</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDashboard;  