import React from 'react';

const EventTable = ({ events, loading }) => {
  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h5>Manage Events</h5>
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
    </div>
  );
};

export default EventTable;
