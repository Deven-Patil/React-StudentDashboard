import React, { useMemo } from 'react';

export default function StudentList({ students, onEdit, onDelete }) {
  const studentItems = useMemo(() => students.map((student, idx) => (
    <div className="student-card" key={idx}>
      <img
        src={student.profileImage ? URL.createObjectURL(student.profileImage) : 'https://via.placeholder.com/80'}
        alt={student.name}
        className="profile-img"
      />
      <div className="student-info">
        <h3>{student.name}</h3>
        <p>{student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
      </div>
      <div className="student-actions">
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student)}>Delete</button>
      </div>
    </div>
  )), [students, onEdit, onDelete]);

  return (
    <div className="student-list">
      {students.length === 0 ? <p>No students added yet.</p> : studentItems}
    </div>
  );
} 