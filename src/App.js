import React, { useState, useEffect, useCallback } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Loader from './components/Loader';
import { fetchCourses } from './api/courses';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch courses on mount
  useEffect(() => {
    let isMounted = true;
    async function getCourses() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchCourses();
        if (isMounted) setCourses(data);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    }
    getCourses();
    return () => { isMounted = false; };
  }, []);

  // Add or update student
  const handleFormSubmit = useCallback((student) => {
    setStudents((prev) => {
      if (editingStudent) {
        return prev.map((s) => (s === editingStudent ? student : s));
      }
      return [...prev, student];
    });
    setEditingStudent(null);
  }, [editingStudent]);

  // Edit student
  const handleEdit = useCallback((student) => {
    setEditingStudent(student);
  }, []);

  // Delete student
  const handleDelete = useCallback((student) => {
    setStudents((prev) => prev.filter((s) => s !== student));
    if (editingStudent === student) setEditingStudent(null);
  }, [editingStudent]);

  // Cancel editing
  const handleCancel = useCallback(() => {
    setEditingStudent(null);
  }, []);

  // Event loop demo: refetch courses with delay
  const handleRefetchCourses = async () => {
    setLoading(true);
    setError('');
    setTimeout(async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to reload courses');
      } finally {
        setLoading(false);
      }
    }, 1500); // 1.5s delay
  };

  return (
    <div className="app-container">
      <header>
        <h1>Student Management Dashboard</h1>
      </header>
      <main>
        <section className="form-section">
          <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
          <StudentForm
            onSubmit={handleFormSubmit}
            courses={courses}
            editingStudent={editingStudent}
            onCancel={handleCancel}
          />
        </section>
        <section className="list-section">
          <h2>All Students</h2>
          <button onClick={handleRefetchCourses} className="refetch-btn">Refetch Courses (Event Loop Demo)</button>
          {loading ? <Loader /> : error ? <div className="error">{error}</div> : <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />}
        </section>
      </main>
      <footer>
        <p>Made with React | Candidate Project Assignment</p>
      </footer>
    </div>
  );
}

export default App;
