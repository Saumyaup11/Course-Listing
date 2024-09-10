// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './StudentDashboard.css';

// Mock data for enrolled courses
const initialCourses = [
  {
    id: '1',
    title: 'React Basics',
    instructor: 'John Doe',
    thumbnail: 'https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256', // Replace with actual image URL
    dueDate: '2024-09-30',
    progress: 50,
    completed: false,
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    instructor: 'Jane Smith',
    thumbnail: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    dueDate: '2024-10-05',
    progress: 75,
    completed: false,
  },
  {
    id: '3',
    title: 'Web Development with Node.js',
    instructor: 'Mike Johnson',
    thumbnail: 'https://cdn.iconscout.com/icon/free/png-256/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256',
    dueDate: '2024-10-15',
    progress: 30,
    completed: false,
  },
];

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    // Simulate fetching courses from an API
    setCourses(initialCourses);
  }, []);

  // Handle marking a course as completed
  const markAsCompleted = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, completed: true } : course
      )
    );
  };
  return (
    <div className="student-dashboard-container">
      <h1>Student Dashboard</h1>
      <button className="navigate-button" onClick={() => navigate('/courses')}>
        Go to Course List
      </button> {/* Button to navigate to the Course List page */}
      {courses.length === 0 ? (
        <p>No enrolled courses available.</p>
      ) : (
        <div className="course-lists">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`course-card ${course.completed ? 'completed' : ''}`}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="course-thumbnail"
              />
              <div className="course-details">
                <h2>{course.title}</h2>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <p>
                  <strong>Due Date:</strong>{' '}
                  {new Date(course.dueDate).toLocaleDateString()}
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p>
                  <strong>Progress:</strong> {course.progress}%
                </p>
                <div className="course-actions">
                  {course.completed ? (
                    <button className="completed-button" disabled>
                      Completed
                    </button>
                  ) : (
                    <button
                      className="mark-completed-button"
                      onClick={() => markAsCompleted(course.id)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

