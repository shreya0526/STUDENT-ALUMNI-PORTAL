import React from 'react';

const AlumniTable = ({ alumni, loading }) => {
  if (loading) return <p style={{ color: '#800080' }}>Loading alumni...</p>;

  return (
    <div>
      <h5 style={{ color: '#800080' }}>Manage Alumni</h5>
      <table className="table table-striped table-bordered" style={{ borderColor: '#FFC0CB' }}>
        <thead style={{ backgroundColor: '#FFC0CB', color: '#4B0082' }}>
          <tr>
            <th>Alumni ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Sector</th>
            <th>Work Title</th>
          </tr>
        </thead>
        <tbody>
          {alumni.map((alum, index) => (
            <tr key={alum.alumni_id} style={{ backgroundColor: index % 2 === 0 ? '#FFFDD0' : '#FFFAFA', color: '#4B0082' }}>
              <td>{alum.alumni_id}</td>
              <td>{alum.user.user_name}</td>
              <td>{alum.user.email}</td>
              <td>{alum.user.phone_no}</td>
              <td>{alum.user.city.city_name}</td>
              <td>{alum.sector.sector_name}</td>
              <td>{alum.worktitle.work_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlumniTable;
