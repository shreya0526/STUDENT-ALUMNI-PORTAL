import React from 'react';
import { useSelector } from 'react-redux';


const AlumniDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Alumni Portal</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Dashboard</a>
          </li>
         
          
          
      </div>
    </div>
  );
};

export default AlumniDashboard;
