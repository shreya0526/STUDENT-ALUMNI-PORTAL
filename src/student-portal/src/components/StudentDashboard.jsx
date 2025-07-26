import React from 'react';
import { useSelector } from 'react-redux';


const StudentDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Student Portal</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Dashboard</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">View Alumni</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Opportunities</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Welcome Student, {user?.user_name} 👋</h2>
        <p>Your email: <strong>{user?.email}</strong></p>
        <hr />
        <div>
          <h5>Your Dashboard Overview</h5>
          <p>This section can be customized to show announcements, events, alumni mentors, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
