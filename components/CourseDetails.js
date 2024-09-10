// src/components/CourseDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const API_URL = 'https://66df2f5ade4426916ee3d014.mockapi.io/courses'; // API endpoint

const CourseDetails = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);

  // Fetch all courses from the API
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/${id}`) // Fetch specific course by ID
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data); // Set the fetched course data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
        setError('Failed to fetch course details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  // Toggle the syllabus section
  const toggleSyllabus = () => {
    setIsSyllabusExpanded(!isSyllabusExpanded);
  };

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!course) {
    return <p>No course details available.</p>;
  }

  return (
    <div className="course-details-container">
      <h1>{course.title || 'Course Name Not Available'}</h1>
      <p>
        <strong>Instructor:</strong> {course.instructor || 'Instructor Not Available'}
      </p>
      <p>
        <strong>Description:</strong> {course.description || 'Description Not Available'}
      </p>
      <p>
        <strong>Enrollment Status:</strong> {course.status || 'Status Not Available'}
      </p>
      <p>
        <strong>Duration:</strong> {course.duration || 'Duration Not Available'}
      </p>
      <p>
        <strong>Schedule:</strong> {course.schedule || 'Schedule Not Available'}
      </p>
      <p>
        <strong>Location:</strong> {course.location || 'Location Not Available'}
      </p>
      <p>
        <strong>Pre-requisites:</strong> {course.prerequisites || 'None'}
      </p>

      <div className="syllabus-section">
        <button onClick={toggleSyllabus} className="syllabus-toggle">
          {isSyllabusExpanded ? 'Hide Syllabus' : 'Show Syllabus'}
        </button>
        {isSyllabusExpanded && (
          <div className="syllabus-content">
            {Array.isArray(course.syllabus) ? (
              <ul className="syllabus-list">
                {course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Syllabus not available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;




