import React from 'react';

const StudentEventList = ({ events, joinedEvents, handleJoinEvent, loading }) => {
  if (loading) return <p>Loading events...</p>;

  return (
    <table className="table table-striped table-bordered">
      <thead>
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
        {events.map(event => (
          <tr key={event.event_id}>
            <td>{event.event_id}</td>
            <td>{event.event_name}</td>
            <td>{new Date(event.date).toLocaleDateString()}</td>
            <td>{event.time}</td>
            <td><a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-info">Link</a></td>
            <td>{event.description}</td>
            <td>{event.alumni.user.user_name}</td>
            <td>{event.alumni.user.email}</td>
            <td>{event.alumni.user.city.city_name}</td>
            <td>{event.alumni.user.city.collage.map(college => college.college_Name).join(', ')}</td>
            <td>
              {joinedEvents.includes(event.event_id) ? (
                <span className="badge bg-success">Registered</span>
              ) : (
                <button className="btn btn-sm btn-success" onClick={() => handleJoinEvent(event.event_id)}>
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