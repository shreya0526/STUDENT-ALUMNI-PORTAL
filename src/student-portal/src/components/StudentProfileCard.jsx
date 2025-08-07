import React from 'react';

const StudentProfileCard = ({ studentProfile, editMode, formData, handleInputChange, handleUpdateSubmit, setEditMode, loading }) => {
  if (loading) return <p>Loading profile...</p>;
  if (!studentProfile) return null;

  return (
    <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body text-center">
        {editMode ? (
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" className="form-control" name="user_name" value={formData.user_name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label>Phone No</label>
              <input type="text" className="form-control" name="phone_no" value={formData.phone_no} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h4>{studentProfile.user.user_name}</h4>
            <p className="text-muted">Student ID: {studentProfile.student_id}</p>
            <div className="text-start">
              <p><strong>Email:</strong> {studentProfile.user.email}</p>
              <p><strong>Phone:</strong> {studentProfile.user.phone_no}</p>
              <p><strong>City:</strong> {studentProfile.user.city.city_name}</p>
              <p><strong>College:</strong> {studentProfile.college.college_Name}</p>
              <p><strong>College City:</strong> {studentProfile.college.city.city_name}</p>
            </div>
            <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>Update Details</button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfileCard;