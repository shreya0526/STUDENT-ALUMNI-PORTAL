import React from 'react';

const Profile = ({ profile }) => {
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body text-center">
        <h4>{profile.user_name}</h4>
        <p className="text-muted">User ID: {profile.user_id}</p>
        <div className="text-start">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone_no}</p>
          <p><strong>City:</strong> {profile.city?.city_name}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
