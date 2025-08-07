// src/components/CreateEventForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CreateEventForm = ({ alumniId }) => {
  const [eventData, setEventData] = useState({
    eventName: '',
    date: '',
    time: '',
    link: '',
    description: '',
    alumniId: alumniId || '',  // alumniId comes from props
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://localhost:7137/api/Event', eventData);
      alert('Event created successfully!');
      setEventData({
        eventName: '',
        date: '',
        time: '',
        link: '',
        description: '',
        alumniId: alumniId,
      });
    } catch (error) {
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create New Event</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
        </div>
        <div>
          <label>Link:</label>
          <input type="text" name="link" value={eventData.link} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
