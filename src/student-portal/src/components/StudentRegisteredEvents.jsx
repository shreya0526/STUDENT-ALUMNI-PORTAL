import React from 'react';

const StudentRegisteredEvents = ({ registeredEvents, loading }) => {
  if (loading) return <p style={{ color: '#800080' }}>Loading registered events...</p>;

  return (
    <table className="table table-striped table-bordered" style={{ borderColor: '#FFC0CB' }}>
      <thead style={{ backgroundColor: '#FFC0CB', color: '#4B0082' }}>
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
        {registeredEvents.map((item, index) => (
          <tr key={item.event.event_id} style={{ backgroundColor: index % 2 === 0 ? '#FFFDD0' : '#FFFAFA', color: '#4B0082' }}>
            <td>{item.event.event_id}</td>
            <td>{item.event.event_name}</td>
            <td>{new Date(item.event.date).toLocaleDateString()}</td>
            <td>{item.event.time}</td>
            <td>{item.event.description}</td>
            <td><a href={item.event.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ backgroundColor: '#FFC0CB', color: '#4B0082', border: 'none' }}>Link</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentRegisteredEvents;
