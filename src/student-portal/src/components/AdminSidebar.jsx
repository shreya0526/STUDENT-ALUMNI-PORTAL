import React from 'react';

const AdminSidebar = ({ onSectionChange }) => (
  <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
    <h4 className="mb-4">Admin Panel</h4>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('dashboard')}>Dashboard</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('manageStudents')}>Manage Students</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('manageAlumni')}>Manage Alumni</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('manageEvents')}>Manage Events</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('settings')}>Settings</button>
      </li>
    </ul>
  </div>
);

export default AdminSidebar;
