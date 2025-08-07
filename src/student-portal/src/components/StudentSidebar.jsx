import React from 'react';

const StudentSidebar = ({ handleSectionChange }) => (
  <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
    <h4 className="mb-4">Student Portal</h4>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => handleSectionChange('events')}>View Events</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => handleSectionChange('registeredEvents')}>Registered Events</button>
      </li>
    </ul>
  </div>
);

export default StudentSidebar;