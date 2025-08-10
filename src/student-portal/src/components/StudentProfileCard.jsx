import React from 'react';

const StudentProfileCard = ({ studentProfile, editMode, formData, handleInputChange, handleUpdateSubmit, setEditMode, loading }) => {
  if (loading) return <p style={{ color: '#800080' }}>Loading profile...</p>;
  if (!studentProfile) return null;

  return (
    <div className="card shadow mx-auto" style={{ maxWidth: '500px', backgroundColor: '#FFFDD0', boxShadow: '0 4px 8px rgba(255, 192, 203, 0.3)' }}>
      <div className="card-body text">
        {editMode ? (
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label style={{ color: '#4B0082' }}>Name</label>
              <input type="text" className="form-control" name="user_name" value={formData.user_name} onChange={handleInputChange} style={{ borderColor: '#FFC0CB', backgroundColor: '#FFFDD0', color: '#4B0082' }} />
            </div>
            <div className="mb-3">
              <label style={{ color: '#4B0082' }}>Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} style={{ borderColor: '#FFC0CB', backgroundColor: '#FFFDD0', color: '#4B0082' }} />
            </div>
            <div className="mb-3">
              <label style={{ color: '#4B0082' }}>Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} style={{ borderColor: '#FFC0CB', backgroundColor: '#FFFDD0', color: '#4B0082' }} />
            </div>
            <div className="mb-3">
              <label style={{ color: '#4B0082' }}>Phone No</label>
              <input type="text" className="form-control" name="phone_no" value={formData.phone_no} onChange={handleInputChange} style={{ borderColor: '#FFC0CB', backgroundColor: '#FFFDD0', color: '#4B0082' }} />
            </div>
            <button type="submit" className="btn" style={{ backgroundColor: '#800080', color: 'white', border: 'none' }}>Save</button>
            <button type="button" className="btn ms-2" onClick={() => setEditMode(false)} style={{ backgroundColor: '#FFC0CB', color: '#4B0082', border: 'none' }}>Cancel</button>
          </form>
        ) : (
          <>
            <h4 style={{ color: '#800080' }}>{studentProfile.user.user_name}</h4>
          
            <div className="text-start" style={{ color: '#4B0082' }}>
              <p><strong>Email:</strong> {studentProfile.user.email}</p>
              <p><strong>Phone:</strong> {studentProfile.user.phone_no}</p>
              <p><strong>City:</strong> {studentProfile.user.city.city_name}</p>
              <p><strong>College:</strong> {studentProfile.college.college_Name}</p>
              <p><strong>College City:</strong> {studentProfile.college.city.city_name}</p>
            </div>
            <button className="btn mt-3" onClick={() => setEditMode(true)} style={{ backgroundColor: '#FF69B4', color: 'white', border: 'none' }}>Update Details</button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfileCard;
