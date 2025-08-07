import React from 'react';

const AlumniSidebar = ({ onSectionChange }) => (
  <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
    <h4 className="mb-4">Alumni Panel</h4>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('dashboard')}>Dashboard</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('registeredEvents')}>Registered Events</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('posts')}>My Posts</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('settings')}>Settings</button>
      </li>
      <li className="nav-item mb-2">
       <button className="btn btn-link text-white" onClick={() => onSectionChange('createEvent')}>Create Event</button>
      </li>
    </ul>
  </div>
);

export default AlumniSidebar;
