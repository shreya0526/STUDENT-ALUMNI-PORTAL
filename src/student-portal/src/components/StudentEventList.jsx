import React from 'react';

const StudentEventList = ({ events, joinedEvents, handleJoinEvent, loading }) => {
  if (loading) return <p style={{ color: '#800080' }}>Loading events...</p>;

  return (
    <table className="table table-striped table-bordered" style={{ borderColor: '#FFC0CB' }}>
      <thead style={{ backgroundColor: '#FFC0CB', color: '#4B0082' }}>
        <tr>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Link</th>
          <th>Description</th>
          <th>Alumni Name</th>
          <th>Alumni Email</th>
          <th>City</th>
          <th>College</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={event.event_id} style={{ backgroundColor: index % 2 === 0 ? '#FFFDD0' : '#FFFAFA', color: '#4B0082' }}>
            <td>{event.event_id}</td>
            <td>{event.event_name}</td>
            <td>{new Date(event.date).toLocaleDateString()}</td>
            <td>{event.time}</td>
            <td><a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ backgroundColor: '#FFC0CB', color: '#4B0082', border: 'none' }}>Link</a></td>
            <td>{event.description}</td>
            <td>{event.alumni.user.user_name}</td>
            <td>{event.alumni.user.email}</td>
            <td>{event.alumni.user.city.city_name}</td>
            <td>{event.alumni.user.city.collage.map(college => college.college_Name).join(', ')}</td>
            <td>
              {joinedEvents.includes(event.event_id) ? (
                <span className="badge" style={{ backgroundColor: '#FF69B4', color: 'white' }}>Registered</span>
              ) : (
                <button className="btn btn-sm" onClick={() => handleJoinEvent(event.event_id)} style={{ backgroundColor: '#800080', color: 'white', border: 'none' }}>
                  Join Event
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentEventList;
