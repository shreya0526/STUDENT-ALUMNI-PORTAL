import React from 'react';

const StudentRegisteredEvents = ({ registeredEvents, loading }) => {
  if (loading) return <p>Loading registered events...</p>;

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {registeredEvents.map(item => (
          <tr key={item.event.event_id}>
            <td>{item.event.event_id}</td>
            <td>{item.event.event_name}</td>
            <td>{new Date(item.event.date).toLocaleDateString()}</td>
            <td>{item.event.time}</td>
            <td>{item.event.description}</td>
            <td><a href={item.event.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-info">Link</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentRegisteredEvents;
