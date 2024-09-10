// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css'; 

const API_URL = 'https://66df2f5ade4426916ee3d014.mockapi.io/courses'; // API endpoint

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses from the API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data); // Set the initial filtered courses
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="course-list-container">
      <h1>Available Courses</h1>
      <input
        type="text"
        placeholder="Search by course name or instructor"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="course-list">
        {filteredCourses.map((course) => (
          <li key={course.id} className="course-item">
            <h2>{course.title}</h2>
            <p>Instructor: {course.instructor}</p>
            <Link to={`/courses/${course.id}`} className="view-details">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;


