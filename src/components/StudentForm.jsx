import React, { useState, useEffect } from 'react';

const initialState = {
  name: '',
  email: '',
  course: '',
  profileImage: ''
};

const validateEmail = (email) => {
  // Simple email regex
  return /^\S+@\S+\.\S+$/.test(email);
};

export default function StudentForm({ onSubmit, courses, editingStudent, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    } else {
      setForm(initialState);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'profileImage' ? files[0] : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format';
    if (!form.course) newErrors.course = 'Course is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      setForm(initialState);
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="course">Course</label>
        <select
          id="course"
          name="course"
          value={form.course}
          onChange={handleChange}
          required
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select>
        {errors.course && <span className="error">{errors.course}</span>}
      </div>
      <div>
        <label htmlFor="profileImage">Profile Image</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{editingStudent ? 'Update' : 'Add'} Student</button>
        {editingStudent && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
} 