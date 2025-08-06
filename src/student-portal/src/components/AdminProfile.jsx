import React from 'react';

const AdminProfile = ({ profile }) => {
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h5>Admin Profile Overview</h5>
      <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body text-center">
          <h4>{profile.user_name}</h4>
          <p className="text-muted">Admin ID: {profile.user_id}</p>
          <div className="text-start">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone_no}</p>
            <p><strong>City:</strong> {profile.city.city_name}</p>
            <p><strong>Role ID:</strong> <span className="badge bg-primary">{profile.role_id}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
