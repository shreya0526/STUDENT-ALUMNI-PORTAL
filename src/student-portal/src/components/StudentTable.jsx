import React from 'react';

const StudentTable = ({ students, loading }) => {
  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h5>Manage Students</h5>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>College</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.user.user_name}</td>
              <td>{student.user.email}</td>
              <td>{student.user.phone_no}</td>
              <td>{student.user.city.city_name}</td>
              <td>{student.college.college_name}</td>
              <td>{student.studentskillset.map(s => s.skillset.skill_name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
