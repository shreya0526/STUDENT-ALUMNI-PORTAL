import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostedEvents = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`https://localhost:7137/api/Alumni/alumni/${userId}`)
        .then((res) => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch(() => {
          alert("Failed to fetch posted events");
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h4>Posted Events</h4>
      {events.length === 0 ? (
        <p>No events posted yet.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.eventName}</strong><br />
              Date: {event.date} | Time: {event.time}<br />
              Description: {event.description}<br />
              Link: <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostedEvents;
