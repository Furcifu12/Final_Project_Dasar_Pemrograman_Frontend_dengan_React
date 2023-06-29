// Student.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/student')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    const selectedFaculty = event.target.value;
    setFacultyFilter(selectedFaculty);

    if (selectedFaculty === 'All') {
      setFilteredStudents(students);
    } else {
      const filteredData = students.filter(
        (student) => student.faculty === selectedFaculty
      );
      setFilteredStudents(filteredData);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/student/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedStudents = students.filter(
          (student) => student.id !== id
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>All Students</h1>
      <label htmlFor="faculty-filter">Filter by Faculty:</label>
      <select
        id="faculty-filter"
        value={facultyFilter}
        onChange={handleFilterChange}
        data-testid="filter"
      >
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">
          Fakultas Ilmu Sosial dan Politik
        </option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">
          Fakultas Teknologi Informasi dan Sains
        </option>
      </select>
      <table id="table-student">
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Faculty</th>
            <th>Program Study</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} className="student-data-row">
              <td>{index + 1}</td>
              <td>
                <Link to={`/student/${student.id}`}>{student.fullname}</Link>
              </td>
              <td>{student.faculty}</td>
              <td>{student.programStudy}</td>
              <td>
                <button
                  data-testid={`delete-${student.id}`}
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
