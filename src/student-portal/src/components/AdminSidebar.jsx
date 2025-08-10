import React from 'react';

const AdminSidebar = ({ onSectionChange }) => (
  <div className="text-white p-3" style={{ width: '250px', backgroundColor: '#800080' }}> {/* Purple sidebar */}
    <h4 className="mb-4">Admin Panel</h4>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('dashboard')} style={{ color: 'white' }}>Dashboard</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('manageStudents')} style={{ color: 'white' }}>Manage Students</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('manageAlumni')} style={{ color: 'white' }}>Manage Alumni</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('manageEvents')} style={{ color: 'white' }}>Manage Events</button>
      </li>
      <li className="nav-item mb-2">
        <button className="btn btn-link text-white" onClick={() => onSectionChange('settings')} style={{ color: 'white' }}>Settings</button>
      </li>
    </ul>
  </div>
);

export default AdminSidebar;
