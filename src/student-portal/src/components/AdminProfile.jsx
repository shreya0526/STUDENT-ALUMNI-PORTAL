import React from 'react';

const AdminProfile = ({ profile }) => {
  if (!profile) return <p style={{ color: '#800080' }}>Loading profile...</p>;

  return (
    <div>
      <h5 style={{ color: '#800080' }}>Admin Profile Overview</h5>
      <div className="card shadow mx-auto" style={{ maxWidth: '500px', backgroundColor: '#FFFDD0', boxShadow: '0 4px 8px rgba(255, 192, 203, 0.3)' }}>
        <div className="card-body">
          <h4 style={{ color: '#800080' }}>{profile.user_name}</h4>
          <p className="text-muted" style={{ color: '#4B0082' }}>Admin ID: {profile.user_id}</p>
          <div className="text-start" style={{ color: '#4B0082' }}>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone_no}</p>
            <p><strong>City:</strong> {profile.city.city_name}</p>
            <p><strong>Role ID:</strong> <span className="badge" style={{ backgroundColor: '#FF69B4', color: 'white' }}>{profile.role_id}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
