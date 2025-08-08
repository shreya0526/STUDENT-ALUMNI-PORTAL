// import React from 'react';

// const StudentSidebar = ({ handleSectionChange }) => (
//   <div className="bg-primary text-white p-3" style={{ width: '250px' }}>
//     <h4 className="mb-4">Student Portal</h4>
//     <ul className="nav flex-column">
//       <li className="nav-item mb-2">
//         <button className="btn btn-link text-white" onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
//       </li>
//       <li className="nav-item mb-2">
//         <button className="btn btn-link text-white" onClick={() => handleSectionChange('events')}>View Events</button>
//       </li>
//       <li className="nav-item mb-2">
//         <button className="btn btn-link text-white" onClick={() => handleSectionChange('registeredEvents')}>Registered Events</button>
//       </li>
      
//     </ul>
//   </div>
// );

// export default StudentSidebar;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAction } from "../store/userSlice";  // adjust path as needed

const StudentSidebar = ({ handleSectionChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userAction.clearUser());     // clear user in Redux
    localStorage.removeItem("user");      // clear user in localStorage
    navigate("/");                    // redirect to login page
  };

  return (
    <div className="bg-primary text-white p-3" style={{ width: "250px" }}>
      <h4 className="mb-4">Student Portal</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-white"
            onClick={() => handleSectionChange("dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-white"
            onClick={() => handleSectionChange("events")}
          >
            View Events
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-white"
            onClick={() => handleSectionChange("registeredEvents")}
          >
            Registered Events
          </button>
        </li>
        <li className="nav-item mt-4">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
