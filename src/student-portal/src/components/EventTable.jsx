import React from 'react';

const EventTable = ({ events, loading }) => {
  if (loading) return <p style={{ color: '#800080' }}>Loading events...</p>;

  return (
    <div>
      <h5 style={{ color: '#800080' }}>Manage Events</h5>
      <table className="table table-striped table-bordered" style={{ borderColor: '#FFC0CB' }}>
        <thead style={{ backgroundColor: '#FFC0CB', color: '#4B0082' }}>
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
          {events.map((event, index) => (
            <tr key={event.event_id} style={{ backgroundColor: index % 2 === 0 ? '#FFFDD0' : '#FFFAFA', color: '#4B0082' }}>
              <td>{event.event_id}</td>
              <td>{event.event_name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.time}</td>
              <td>
                <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: '#800080' }}>
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
