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
    <div className="text-white p-3" style={{ width: "250px", backgroundColor: '#800080' }}> {/* Purple sidebar */}
      <h4 className="mb-4">Student Portal</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-white"
            onClick={() => handleSectionChange("dashboard")}
            style={{ color: 'white' }}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-white"
            onClick={() => handleSectionChange("events")}
            style={{ color: 'white' }}
          >
            View Events
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-white"
            onClick={() => handleSectionChange("registeredEvents")}
            style={{ color: 'white' }}
          >
            Registered Events
          </button>
        </li>
        <li className="nav-item mt-4">
          <button className="btn w-100" onClick={handleLogout} style={{ backgroundColor: '#FF69B4', color: 'white', border: 'none' }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
