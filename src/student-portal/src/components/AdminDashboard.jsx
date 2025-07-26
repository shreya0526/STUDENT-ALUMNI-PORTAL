import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const user = useSelector((state) => state.loggedInUser);

  // Optional: Redirect or return null if not admin
//   if (user.role_id != 1) {
    

//     return <div className="p-4">Access Denied. You are not an admin.</div>;
     
//   }
   

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Dashboard</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Manage Students</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Manage Alumni</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Job Opportunities</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>Welcome Admin, {user?.user_name} 👋</h2>
        <p>Your email: <strong>{user?.email}</strong></p>
        <hr />
        <div>
          <h5>Admin Dashboard Overview</h5>
          <p>This section can include reports, user management tools, analytics, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
